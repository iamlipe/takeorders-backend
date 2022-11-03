import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { SpentService } from "../services/spentService";
import { validateCreateSpent } from '../validations/validateCreateSpent';

export class SpentController {
  private SpentService: SpentService;

  constructor() {
    this.SpentService = new SpentService();
  }

  public create = async(req: Request, res: Response) => {
    const { userId } = req.body;

    await validateCreateSpent({ userId });

    const result = await this.SpentService.create({ userId });

    res.status(StatusCodes.CREATED).json(result);
  };

  public get = async(_req: Request, res: Response) => {
    const result = await this.SpentService.get();

    res.status(StatusCodes.OK).json(result);
  };
}