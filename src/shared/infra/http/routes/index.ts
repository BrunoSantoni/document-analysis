import { Router } from 'express';

import analysesRouter from '@modules/analyses/infra/http/routes/analyses.routes';

const routes = Router();

routes.use('/analyses', analysesRouter);

export default routes;
