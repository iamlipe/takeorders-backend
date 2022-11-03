import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { OrderService } from "../services/orderService";
import { validateCreateOrder } from '../validations/validateCreateOrder';
import { validateUpdateOrder } from '../validations/validateUpdateOrder';

export class OrderController {
  private OrderService: OrderService;

  constructor() {
    this.OrderService = new OrderService();
  }

  public create = async(req: Request, res: Response) => {
    const newOrder = req.body;

    await validateCreateOrder(newOrder);

    const result = this.OrderService.create(newOrder);

    res.status(StatusCodes.CREATED).json(result);
  }

  public get = async(_req: Request, res: Response) => {
    const result = this.OrderService.get();

    res.status(StatusCodes.OK).json(result);
  }

  public update = async(req: Request, res: Response) => {
    const updateOrder = req.body;

    await validateUpdateOrder(updateOrder);

    const result  = this.OrderService.update(updateOrder)

    res.status(StatusCodes.OK).json(result);
  }

  public remove = async(req: Request, res: Response) => {
    const removeOrder = req.body;

    await validateUpdateOrder(removeOrder);

    await this.OrderService.remove(removeOrder);

    res.status(StatusCodes.OK).json(removeOrder);
  }
}