import { getRepository, Repository } from 'typeorm';
import { v4 } from 'uuid';

import IAnalysesRepository from '@modules/analyses/repositories/IAnalysesRepository';
import ICreateAnalysisDto from '@modules/analyses/dtos/ICreateAnalysisDto';
import IDocument from '@modules/analyses/types/IDocument';
import Analysis from '../entities/Analysis';

type IDocumentStatus = 'valid' | 'fraud' | 'error';

class AnalysisRepository implements IAnalysesRepository {
  private ormRepository: Repository<Analysis>;

  constructor() {
    this.ormRepository = getRepository(Analysis);
  }

  public async findSpecificAnalysis(analysisId: string): Promise<Analysis> {
    return this.ormRepository.findOne(analysisId);
  }

  public async findAll(): Promise<Analysis[]> {
    return this.ormRepository.find();
  }

  public async create({
    fullName,
    cpf,
    documents,
  }: ICreateAnalysisDto): Promise<Analysis> {
    const analyzedAt = new Date();

    const documentPossibleStatus: IDocumentStatus[] = [
      'valid',
      'fraud',
      'error',
    ];

    const formattedDocuments: IDocument[] = documents.map(document => {
      const randomStatusIndex = Math.floor(Math.random() * 3);

      const documentStatus = documentPossibleStatus[randomStatusIndex];

      return {
        id: v4(),
        status: documentStatus,
        src: document,
      };
    });

    const analysis = this.ormRepository.create({
      fullName,
      cpf,
      analyzedAt,
      documents: formattedDocuments,
    });

    await this.ormRepository.save(analysis);

    return analysis;
  }
}

export default AnalysisRepository;
