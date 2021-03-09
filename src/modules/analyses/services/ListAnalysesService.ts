import ServerError from '@shared/errors/ServerError';
import ICacheProvider from '@shared/container/providers/CacheProvider/interfaces/ICacheProvider';
import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';
import Analysis from '../infra/typeorm/entities/Analysis';
import IAnalysesRepository from '../repositories/IAnalysesRepository';

@injectable()
class ListAnalysesService {
  constructor(
    @inject('AnalysesRepository')
    private analysesRepository: IAnalysesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async run(): Promise<Analysis[]> {
    let allAnalyses = await this.cacheProvider.recover<Analysis[]>(
      'list-analyses',
    );

    if (!allAnalyses) {
      allAnalyses = await this.analysesRepository.findAll();

      if (allAnalyses.length < 1) {
        throw new ServerError('Nenhuma análise encontrada');
      }

      await this.cacheProvider.save('list-analyses', classToClass(allAnalyses));
    }

    return allAnalyses;
  }
}

export default ListAnalysesService;
