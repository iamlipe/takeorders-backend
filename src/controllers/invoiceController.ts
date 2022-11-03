import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { InvoiceService } from "../services/invoiceService";
import { validateCreateInvoice } from '../validations/validateCreateInvoice';

export class InvoiceController {
  private InvoiceService: InvoiceService;

  constructor() {
    this.InvoiceService = new InvoiceService();
  }

  public create = async(req: Request, res: Response) => {
    const { userId } = req.body;

    await validateCreateInvoice({ userId });

    const result = await this.InvoiceService.create(userId);

    res.status(StatusCodes.CREATED).json(result);
  };

  public get = async(_req: Request, res: Response) => {
    const result = await this.InvoiceService.get();

    res.status(StatusCodes.OK).json(result);
  };
}