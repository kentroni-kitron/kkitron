import { tsquery } from '@phenomnomnominal/tsquery';
import { ImportDeclaration } from 'typescript';

export const addImport = (options: {
  file: string,
  name: string,
  source: string,
  isNamed?: boolean,
  padding?: string,
}): string => {
  const {
    file,
    name,
    source,
    isNamed = true,
    padding = '\n\n',
  } = options;

  const ast = tsquery.ast(file);
  const allImports = tsquery(ast, 'ImportDeclaration');
  const lastImport = allImports[allImports.length - 1] as ImportDeclaration;
  let lastImportModuleType: 'lib' | 'local';
  if (lastImport.moduleSpecifier.getText().match(/^'(\w|@)/)) {
    lastImportModuleType = 'lib';
  } else if (lastImport.moduleSpecifier.getText().match(/^'\./)) {
    lastImportModuleType = 'local';
  }

  const startPadding = lastImportModuleType === 'local' ? '\n' : padding;

  return tsquery.replace(
    file,
    `ImportDeclaration[pos=${lastImport.pos}]`,
    node => {
      const importClause = isNamed ? `{ ${name} }` : name;
      const importDeclaration = `import ${importClause} from '${source}'`;
      return `${node.getText()}${startPadding}${importDeclaration}${padding}`;
    },
  )
};
