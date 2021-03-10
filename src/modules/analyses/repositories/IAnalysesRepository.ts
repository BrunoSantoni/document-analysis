import Analysis from '../infra/typeorm/entities/Analysis';

import ICreateAnalysisDto from '../dtos/ICreateAnalysisDto';

export default interface IAnalysesRepository {
  create(data: ICreateAnalysisDto): Promise<Analysis>;
  findSpecificAnalysis(analysisId: string): Promise<Analysis>;
  findAll(limit: number, step: number): Promise<Analysis[]>;
}
