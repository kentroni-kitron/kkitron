import { ResourceGeneratorSchema } from './schema';

export interface NormalizedSchema extends ResourceGeneratorSchema {
  npmScope: string;
  nameCamel: string;
  nameCamelSingle: string;
}
