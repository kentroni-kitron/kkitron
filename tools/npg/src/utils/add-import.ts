import { tsquery } from '@phenomnomnominal/tsquery';

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
  const lastImport = allImports[allImports.length - 1];

  return tsquery.replace(
    file,
    `ImportDeclaration[pos=${lastImport.pos}]`,
    node => {
      const importClause = isNamed ? `{ ${name} }` : name;
      const importDeclaration = `import ${importClause} from '${source}'`;
      return `${node.getText()}${padding}${importDeclaration}${padding}`;
    },
  )
};
