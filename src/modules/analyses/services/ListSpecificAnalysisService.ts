import ICacheProvider from '@shared/container/providers/CacheProvider/interfaces/ICacheProvider';
import ServerError from '@shared/errors/ServerError';
import { classToClass } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import { validate } from 'uuid';
import Analysis from '../infra/typeorm/entities/Analysis';
import IAnalysesRepository from '../repositories/IAnalysesRepository';

@injectable()
class ListSpecificAnalysisService {
  constructor(
    @inject('AnalysesRepository')
    private analysesRepository: IAnalysesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async run(analysisId: string): Promise<Analysis> {
    const isAnalysisIdAValidUuid = validate(analysisId);

    if (!isAnalysisIdAValidUuid) {
      throw new ServerError('ID informado não é válido');
    }

    let analysis = await this.cacheProvider.recover<Analysis>(
      `list-analysis:${analysisId}`,
    );

    if (analysis) {
      return analysis;
    }

    analysis = await this.analysesRepository.findSpecificAnalysis(analysisId);

    if (!analysis) {
      throw new ServerError('Nenhuma análise com esse ID foi encontrada', 404);
    }

    await this.cacheProvider.save(
      `list-analysis:${analysisId}`,
      classToClass(analysis),
    );

    return analysis;
  }
}

export default ListSpecificAnalysisService;
