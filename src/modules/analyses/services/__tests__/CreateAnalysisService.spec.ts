import FakeAnalysesRepository from '@modules/analyses/repositories/fakes/FakeAnalysesRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ServerError from '@shared/errors/ServerError';
import CreateAnalysisService from '../CreateAnalysisService';

let fakeAnalysesRepository: FakeAnalysesRepository;
let fakeCacheProvider: FakeCacheProvider;
let createAnalysis: CreateAnalysisService;

describe('CreateAnalysis', () => {
  beforeEach(() => {
    fakeAnalysesRepository = new FakeAnalysesRepository();
    fakeCacheProvider = new FakeCacheProvider();
    createAnalysis = new CreateAnalysisService(
      fakeAnalysesRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create an analysis', async () => {
    const analysis = await createAnalysis.run({
      fullName: 'Bruno Santoni',
      cpf: '12345678910',
      documents: ['www.teste.com.br', 'www.teste.net'],
    });

    expect(analysis).toHaveProperty('analysisId');
    expect(analysis.analysisId).toBeTruthy();
  });

  it('should not be able to create an analysis without a full name', async () => {
    await expect(
      createAnalysis.run({
        fullName: '',
        cpf: '12345678910',
        documents: ['www.teste.com.br', 'www.teste.net'],
      }),
    ).rejects.toBeInstanceOf(ServerError);
  });

  it('should not be able to create an analysis with incorrects documents urls', async () => {
    await expect(
      createAnalysis.run({
        fullName: 'Bruno Santoni',
        cpf: '12345678910',
        documents: ['error', 'error', 'no'],
      }),
    ).rejects.toBeInstanceOf(ServerError);
  });
});
