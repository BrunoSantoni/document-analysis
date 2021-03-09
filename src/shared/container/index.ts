import { container } from 'tsyringe';

import './providers';

import AnalysesRepository from '@modules/analyses/infra/typeorm/repositories/AnalysesRepository';
import IAnalysesRepository from '@modules/analyses/repositories/IAnalysesRepository';

container.registerSingleton<IAnalysesRepository>(
  'AnalysesRepository',
  AnalysesRepository,
);
