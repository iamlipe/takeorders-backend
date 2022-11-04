import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { StockService } from "../services/stockService";
import { validateStock } from '../validations/validateStock';

export class StockController {
  private StockService: StockService;

  constructor() {
    this.StockService = new StockService();
  }

  public create = async(req: Request, res: Response) => {
    const newStock = req.body;

    await validateStock(newStock);

    const result = await this.StockService.create(newStock);

    res.status(StatusCodes.CREATED).json(result);
  };

  public get = async(req: Request, res: Response) => {
    const result = await this.StockService.get(req.query);

    res.status(StatusCodes.OK).json(result);
  };

  public getById = async(req: Request, res: Response) => {
    const { id } = req.params;

    const result = await this.StockService.getById({ id });

    res.status(StatusCodes.OK).json(result);
  }
}