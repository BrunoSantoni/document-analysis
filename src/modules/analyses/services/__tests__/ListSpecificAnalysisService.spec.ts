import Analysis from '@modules/analyses/infra/typeorm/entities/Analysis';
import FakeAnalysesRepository from '@modules/analyses/repositories/fakes/FakeAnalysesRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ServerError from '@shared/errors/ServerError';
import { classToClass } from 'class-transformer';
import CreateAnalysisService from '../CreateAnalysisService';
import ListSpecificAnalysisService from '../ListSpecificAnalysisService';

let fakeAnalysesRepository: FakeAnalysesRepository;
let fakeCacheProvider: FakeCacheProvider;
let listSpecificAnalysis: ListSpecificAnalysisService;
let createAnalysis: CreateAnalysisService;

describe('ListSpecificAnalysis', () => {
  beforeEach(() => {
    fakeAnalysesRepository = new FakeAnalysesRepository();
    fakeCacheProvider = new FakeCacheProvider();
    createAnalysis = new CreateAnalysisService(
      fakeAnalysesRepository,
      fakeCacheProvider,
    );
    listSpecificAnalysis = new ListSpecificAnalysisService(
      fakeAnalysesRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list all analyses from a specific user', async () => {
    const newAnalysis = await createAnalysis.run({
      fullName: 'Bruno Santoni',
      cpf: '12345678910',
      documents: ['www.teste.com.br', 'www.teste.net'],
    });

    const { analysisId } = newAnalysis;

    const analyses = await listSpecificAnalysis.run(analysisId as string);

    expect(analyses.fullName).toBe('Bruno Santoni');
  });

  it('should not be able to list all analyses of an non-existing user', async () => {
    await expect(listSpecificAnalysis.run('123')).rejects.toBeInstanceOf(
      ServerError,
    );
  });

  it('should not be able to list all analyses if there are none', async () => {
    await expect(
      listSpecificAnalysis.run('df4283cf-018a-4bcd-9f68-d751f39a1100'),
    ).rejects.toBeInstanceOf(ServerError);
  });
});
