import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { SaleService } from '../services/saleService';
import { validateSale } from '../validations/validateSale';

export class SaleController {
  private SaleService: SaleService;

  constructor() {
    this.SaleService = new SaleService();
  }

  public create = async(req: Request, res: Response) => {
    const newSale = req.body;

    await validateSale(newSale);

    const result = await this.SaleService.create(newSale);

    res.status(StatusCodes.CREATED).json(result);
  }

  public get = async(req: Request, res: Response) => {
    const result = await this.SaleService.get(req.query);

    res.status(StatusCodes.OK).json(result);
  }

  public getById = async(req: Request, res: Response) => {
    const { id } = req.params;

    const result = await this.SaleService.getById({ id });

    res.status(StatusCodes.OK).json(result);
  }

  public update = async(req: Request, res: Response) => {
    const { id } = req.params;
    const updateSale = req.body;

    await validateSale(updateSale);

    const result = await this.SaleService.update({ id, updateSale });

    res.status(StatusCodes.OK).json(result);
  }

  public remove = async(req: Request, res: Response) => {
    const { id } = req.params;

    await this.SaleService.remove({ id });

    res.status(StatusCodes.NO_CONTENT).send("REMOVED")
  }
}
