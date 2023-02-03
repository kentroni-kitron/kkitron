export interface ResourceGeneratorSchema {
  name: string;
  project: string;
  appDirectory: string;
  resourcesDirectory: string;
  projectLib?: string;
  dataAccessDbDirectory: string;
  dbTypesDirectory: string;
  numericId: boolean;
  nameSingle?: string;
  namePascal?: string;
  namePascalSingle?: string;
}
