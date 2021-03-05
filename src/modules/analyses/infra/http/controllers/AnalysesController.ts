import { Request, Response } from 'express';

import CreateAnalysisService from '@modules/analyses/services/CreateAnalysisService';
import ListAnalysesService from '@modules/analyses/services/ListAnalysesService';
import ListSpecificAnalysisService from '@modules/analyses/services/ListSpecificAnalysisService';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

class AnalysesController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listAnalyses = container.resolve(ListAnalysesService);
    const analyses = await listAnalyses.run();

    return res.json(classToClass(analyses));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { analysisId } = req.params;

    const listSpecificAnalysis = container.resolve(ListSpecificAnalysisService);
    const analysis = await listSpecificAnalysis.run(analysisId);

    return res.json(classToClass(analysis));
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { fullName, cpf, documents } = req.body;

    const createAnalysis = container.resolve(CreateAnalysisService);

    const analysisId = await createAnalysis.run({ fullName, cpf, documents });

    return res.json(analysisId);
  }
}

export default AnalysesController;
