import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { SpentService } from "../services/spentService";
import { validateSpent } from '../validations/validateSpent';

export class SpentController {
  private SpentService: SpentService;

  constructor() {
    this.SpentService = new SpentService();
  }

  public create = async(req: Request, res: Response) => {
    const newSpent = req.body;

    await validateSpent(newSpent);

    const result = await this.SpentService.create(newSpent);

    res.status(StatusCodes.CREATED).json(result);
  };

  public get = async(req: Request, res: Response) => {
    const result = await this.SpentService.get(req.query);

    res.status(StatusCodes.OK).json(result);
  };

  public getById = async(req: Request, res: Response) => {
    const { id } = req.params;

    const result  = await this.SpentService.getById({ id })

    res.status(StatusCodes.OK).json(result);
  }
}