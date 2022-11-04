import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import { PurchaseService } from "../services/purchaseService";
import { validatePurchase } from "../validations/validatePurchase";

export class PurchaseController {
  private PurchaseService: PurchaseService;

  constructor() {
    this.PurchaseService = new PurchaseService();
  }

  public create = async(req: Request, res: Response) => {
    const newPurchase = req.body;

    await validatePurchase(newPurchase);

    const result = await this.PurchaseService.create(newPurchase);

    res.status(StatusCodes.CREATED).json(result)
  }
  
  public get = async(req: Request, res: Response) => {
    const result = await this.PurchaseService.get(req.query);

    res.status(StatusCodes.OK).json(result);
  }
  
  public getById = async(req: Request, res: Response) => {
    const { id } = req.params;

    const result = await this.PurchaseService.getById({ id });

    res.status(StatusCodes.OK).json(result);
  }
  
  public update = async(req: Request, res: Response) => {
    const { id } = req.params;
    const updatePurchase = req.body;

    await validatePurchase(updatePurchase);

    const result = await this.PurchaseService.update({ id, updatePurchase });

    res.status(StatusCodes.OK).json(result);
  }
  
  public remove = async(req: Request, res: Response) => {
    const { id } = req.params;

    await this.PurchaseService.remove({ id });

    res.status(StatusCodes.NO_CONTENT).send("REMOVED");
  }
}