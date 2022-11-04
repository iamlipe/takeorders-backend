import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ProfitService } from "../services/profitService";
import { ErrorHandler } from '../utils/errorHandler';

export class ProfitController {
  private ProfitService: ProfitService;

  constructor() {
    this.ProfitService = new ProfitService();
  }

  public get = async(req: Request, res: Response) => {
    const { invoiceId, spentId } = req.query;

    if (!invoiceId && !spentId) {
      throw new ErrorHandler(
        StatusCodes.BAD_REQUEST,
        'You must pass spentId and invoiceId as query',
      );
    }

    if (typeof spentId === 'string' && typeof invoiceId === 'string') {
      const result = await this.ProfitService.get({ invoiceId, spentId });

      return res.status(StatusCodes.OK).json(result);
    }
    
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'something went wrong' });
  }
}