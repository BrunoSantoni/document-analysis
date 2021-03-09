import { inject, injectable } from 'tsyringe';

import ServerError from '@shared/errors/ServerError';

import ICreateAnalysisDto from '@modules/analyses/dtos/ICreateAnalysisDto';
import checkDocuments from '@shared/helpers/checkDocuments';
import ICacheProvider from '@shared/container/providers/CacheProvider/interfaces/ICacheProvider';
import IAnalysesRepository from '../repositories/IAnalysesRepository';

@injectable()
class CreateAnalysisService {
  constructor(
    @inject('AnalysesRepository')
    private analysesRepository: IAnalysesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async run({
    fullName,
    cpf,
    documents,
  }: ICreateAnalysisDto): Promise<Record<string, unknown>> {
    if (!fullName || !cpf || documents.length === 0) {
      throw new ServerError('Todos os campos devem ser preenchidos');
    }

    const areDocumentsValid = checkDocuments(documents);

    if (!areDocumentsValid) {
      throw new ServerError('O documento contém URLs inválidas');
    }

    const { analysisId } = await this.analysesRepository.create({
      fullName,
      cpf,
      documents,
    });

    await this.cacheProvider.invalidate('list-analyses');

    const responsePattern = {
      analysisId,
    };

    return responsePattern;
  }
}

export default CreateAnalysisService;
