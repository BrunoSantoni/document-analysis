import { container } from 'tsyringe';

import './providers';

import AnalysisRepository from '@modules/analyses/infra/typeorm/repositories/AnalysisRepository';
import IAnalysesRepository from '@modules/analyses/repositories/IAnalysesRepository';

container.registerSingleton<IAnalysesRepository>(
  'AnalysesRepository',
  AnalysisRepository,
);
