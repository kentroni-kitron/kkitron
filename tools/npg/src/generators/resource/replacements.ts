import { ReplacementMap } from '../../types';
import { NormalizedSchema } from './types';

export const getReplacements = (options: NormalizedSchema): ReplacementMap => {
  return {
    [`
      PropertyAssignment:has([escapedText="imports"]) >
      ArrayLiteralExpression >
      *:last-child
    `]: node => {
      return `${node.getText()}\n    ${options.namePascal}Module`;
    },
  };
};
