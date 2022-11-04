import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { OrderService } from "../services/orderService";
import { validateOrder } from '../validations/validateOrder';

export class OrderController {
  private OrderService: OrderService;

  constructor() {
    this.OrderService = new OrderService();
  }

  public create = async(req: Request, res: Response) => {
    const newOrder = req.body;

    await validateOrder(newOrder);

    const result = await this.OrderService.create(newOrder);

    res.status(StatusCodes.CREATED).json(result);
  }

  public get = async(req: Request, res: Response) => {
    const result = await this.OrderService.get(req.query);

    res.status(StatusCodes.OK).json(result);
  }

  public getById = async(req: Request, res: Response) => {
    const { id } = req.params;

    const result = await this.OrderService.getById({ id });

    res.status(StatusCodes.OK).json(result);
  }

  public update = async(req: Request, res: Response) => {
    const { id } = req.params;
    const updateOrder = req.body

    const result = await this.OrderService.update({ id, updateOrder })

    res.status(StatusCodes.OK).json(result);
  }

  public remove = async(req: Request, res: Response) => {
    const { id } = req.params;

    await this.OrderService.remove({ id });

    res.status(StatusCodes.OK).json({ id });
  }
}