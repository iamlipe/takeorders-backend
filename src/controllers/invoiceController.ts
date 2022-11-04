import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { InvoiceService } from "../services/invoiceService";
import { validateInvoice } from '../validations/validateInvoice';

export class InvoiceController {
  private InvoiceService: InvoiceService;

  constructor() {
    this.InvoiceService = new InvoiceService();
  }

  public create = async(req: Request, res: Response) => {
    const newInvoice = req.body;

    await validateInvoice(newInvoice);

    const result = await this.InvoiceService.create(newInvoice);

    res.status(StatusCodes.CREATED).json(result);
  };

  public get = async(req: Request, res: Response) => {
    const result = await this.InvoiceService.get(req.query);

    res.status(StatusCodes.OK).json(result);
  }

  public getById = async(req: Request, res: Response) => {
    const { id } = req.params;

    const result = await this.InvoiceService.getById({ id })

    res.status(StatusCodes.OK).json(result);
  };
}