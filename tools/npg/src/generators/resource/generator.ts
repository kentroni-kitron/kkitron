import * as path from 'path';
import { camelCase, pascalCase } from 'change-case';
import {
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  Tree,
} from '@nrwl/devkit';
import { tsquery } from '@phenomnomnominal/tsquery';

import { ResourceGeneratorSchema } from './schema';
import { NormalizedSchema } from './types';
import { addImport, trimLineBreaks } from '../../utils';

export default async function (tree: Tree, options: ResourceGeneratorSchema) {
  const { appsDir, npmScope } = getWorkspaceLayout(tree);
  const { project, name } = options;
  const nameSingle = options.nameSingle ?? name.replace(/s$/, '');
  const namePascal = options.namePascal ?? pascalCase(name);
  const namePascalSingle = options.namePascalSingle ?? pascalCase(nameSingle);
  const normalizedSchema: NormalizedSchema = {
    ...options,
    projectLib: options.projectLib ?? project,
    nameSingle,
    namePascal,
    namePascalSingle,
    nameCamel: camelCase(namePascal),
    nameCamelSingle: camelCase(namePascalSingle),
    npmScope,
  };

  const filesTarget = path.join(
    appsDir,
    normalizedSchema.project,
    normalizedSchema.appDirectory,
    normalizedSchema.resourcesDirectory,
  );

  generateFiles(
    tree,
    path.join(__dirname, 'files'),
    filesTarget,
    normalizedSchema,
  );

  const appModulePath = `${appsDir}/${project}/${options.appDirectory}/app.module.ts`;
  const appModuleContent = tree.read(appModulePath, 'utf-8');

  const addedImport = addImport({
    file: appModuleContent,
    name: `${namePascal}Module`,
    source: `./${normalizedSchema.resourcesDirectory}/${name}/${name}.module`,
  });

  const addedImportInArray = tsquery.replace(
    addedImport,
    `
      PropertyAssignment:has([escapedText="imports"]) >
      ArrayLiteralExpression >
      *:last-child
    `,
    node => `${node.getText()},\n    ${namePascal}Module`,
  );

  const trimmedLineBreaks = trimLineBreaks(addedImportInArray);

  tree.write(appModulePath, trimmedLineBreaks);

  formatFiles(tree);
}
