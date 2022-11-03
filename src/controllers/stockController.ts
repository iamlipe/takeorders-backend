import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { StockService } from "../services/stockService";
import { validateCreateStock } from '../validations/validateCreateStock';

export class StockController {
  private StockService: StockService;

  constructor() {
    this.StockService = new StockService();
  }

  public create = async(req: Request, res: Response) => {
    const { userId } = req.body;

    await validateCreateStock({ userId });

    const result = await this.StockService.create({ userId });

    res.status(StatusCodes.CREATED).json(result);
  };

  public get = async(_req: Request, res: Response) => {
    const result = await this.StockService.get();

    res.status(StatusCodes.OK).json(result);
  };
}