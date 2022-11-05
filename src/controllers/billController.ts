import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BillService } from "../services/billService";
import { validateBill } from "../validations/validateBill";

export class BillController {
  private BillService: BillService;

  constructor() {
    this.BillService = new BillService();
  }

  public create = async(req: Request, res: Response) => {
    const newBill = req.body;

    await validateBill(newBill);

    const result = await this.BillService.create(newBill);

    res.status(StatusCodes.CREATED).json(result);
  }

  public get = async(req: Request, res: Response) => {
    const result = await this.BillService.get(req.query)

    res.status(StatusCodes.OK).json(result);
  }

  public getById = async(req: Request, res: Response) => {
    const { id } = req.params;

    const result = await this.BillService.getById({ id });

    res.status(StatusCodes.OK).json(result);
  }

  public update = async(req: Request, res: Response) => {
    const { id } = req.params;
    const updateBill = req.body;
    
    const result = await this.BillService.update({ id, updateBill });

    res.status(StatusCodes.OK).json(result);
  }

  public updateImage = async(req: Request, res: Response) => {
    const { id } = req.params;
    const { key } = req.file as any;

    const url = `${process.env.FILE_URL}/${key}`;

    await this.BillService.updateImage({ id, url });

    res.status(StatusCodes.OK).json({ id, url })
  }

  public closeBill = async(req: Request, res: Response) => {
    const { id } = req.params;

    await this.BillService.closeBill({ id });

    res.status(StatusCodes.NO_CONTENT).send("CLOSED")
  }

  public remove = async(req: Request, res: Response) => {
    const { id } = req.params;

    await this.BillService.remove({ id });

    res.status(StatusCodes.OK).json({ id });
  }
}