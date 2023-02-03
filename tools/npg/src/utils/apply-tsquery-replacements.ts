import { tsquery } from '@phenomnomnominal/tsquery';

import { ReplacementMap } from '../types';

export const applyTSQueryReplacements = (input: string, replacements: ReplacementMap): string => {
  let result = input;

  Object.keys(replacements).forEach(selector => {
    result = tsquery.replace(result, selector, replacements[selector]);
  });

  return result;
};
