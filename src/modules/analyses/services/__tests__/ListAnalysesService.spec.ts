import FakeAnalysesRepository from '@modules/analyses/repositories/fakes/FakeAnalysesRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ServerError from '@shared/errors/ServerError';
import CreateAnalysisService from '../CreateAnalysisService';
import ListAnalysesService from '../ListAnalysesService';

let fakeAnalysesRepository: FakeAnalysesRepository;
let fakeCacheProvider: FakeCacheProvider;
let listAnalyses: ListAnalysesService;
let createAnalysis: CreateAnalysisService;

describe('ListAnalyses', () => {
  beforeEach(() => {
    fakeAnalysesRepository = new FakeAnalysesRepository();
    fakeCacheProvider = new FakeCacheProvider();
    createAnalysis = new CreateAnalysisService(
      fakeAnalysesRepository,
      fakeCacheProvider,
    );
    listAnalyses = new ListAnalysesService(
      fakeAnalysesRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list all analyses', async () => {
    await createAnalysis.run({
      fullName: 'Bruno Santoni',
      cpf: '12345678910',
      documents: ['www.teste.com.br', 'www.teste.net'],
    });

    await createAnalysis.run({
      fullName: 'Luppa',
      cpf: '12345678911',
      documents: ['www.luppa.com.br', 'www.luppa.net'],
    });

    const analyses = await listAnalyses.run();

    expect(analyses).toHaveLength(2);
  });

  it('should not be able to list analyses, if none is created', async () => {
    await expect(listAnalyses.run()).rejects.toBeInstanceOf(ServerError);
  });
});
