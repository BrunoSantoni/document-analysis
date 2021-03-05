import { Router } from 'express';

import AnalysesController from '../controllers/AnalysesController';

const analysesRouter = Router();
const analysesController = new AnalysesController();

analysesRouter.get('/', analysesController.index);
analysesRouter.get('/:analysisId', analysesController.show);
analysesRouter.post('/', analysesController.create);

export default analysesRouter;
