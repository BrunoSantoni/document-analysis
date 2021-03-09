import ICreateAnalysisDto from '@modules/analyses/dtos/ICreateAnalysisDto';
import IDocument from '@modules/analyses/types/IDocument';
import { IDocumentStatus } from '@modules/analyses/types/IDocumentStatus';
import { v4 } from 'uuid';
import Analysis from '../../infra/typeorm/entities/Analysis';
import IAnalysesRepository from '../IAnalysesRepository';

class FakeAnalysesRepository implements IAnalysesRepository {
  private analyses: Analysis[] = [];

  public async findSpecificAnalysis(analysisId: string): Promise<Analysis> {
    const specificAnalysis = this.analyses.find(
      analysis => analysis.analysisId === analysisId,
    );

    return specificAnalysis;
  }

  public async findAll(): Promise<Analysis[]> {
    return this.analyses;
  }

  public async create({
    fullName,
    cpf,
    documents,
  }: ICreateAnalysisDto): Promise<Analysis> {
    const analysedAt = new Date();

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

    const analysis = new Analysis();

    analysis.analysisId = v4();
    analysis.fullName = fullName;
    analysis.cpf = cpf;
    analysis.analysedAt = analysedAt;
    analysis.documents = formattedDocuments;

    this.analyses.push(analysis);

    return analysis;
  }
}

export default FakeAnalysesRepository;
