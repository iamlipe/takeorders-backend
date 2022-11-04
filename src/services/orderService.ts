import { Order } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import {
  GetOrderById,
  NewOrder,
  QueryOrder,
  RemoveOrder,
  UpdateOrder,
} from "../interfaces/Order";
import { OrderRepository } from "../repositories/orderRepository";
import { BillService } from "./billService";
import { ProductService } from "./productService";
import { ErrorHandler } from "../utils/errorHandler";

export class OrderService {
  private OrderRepository: OrderRepository;

  private ProductService: ProductService;

  private BillService: BillService;

  constructor() {
    this.OrderRepository = new OrderRepository;
    this.ProductService = new ProductService;
    this.BillService = new BillService();
  }

  public async create(newOrder: NewOrder): Promise<Order> {
    await this.ProductService.existProduct(newOrder.productId);

    await this.BillService.existBill(newOrder.billId);

    return this.OrderRepository.create(newOrder);
  }

  public async get(queryOrder: QueryOrder): Promise<Order []> {
    await this.BillService.existBill(queryOrder.billId);

    return this.OrderRepository.get(queryOrder);
  }

  public async getById({ id }: GetOrderById): Promise<Order> {
    await this.existOrder(id);

    return this.OrderRepository.getById(id);
  }

  public async existOrder(id: string): Promise<void> {
    const exist = await this.OrderRepository.getById(id);

    if (!exist) { 
      throw new ErrorHandler(StatusCodes.NOT_FOUND, "Unregistered order");
    }
  }

  public async update({ id, updateOrder }: UpdateOrder): Promise<Order> {
    await this.OrderRepository.getById(id);

    await this.ProductService.existProduct(updateOrder.productId);

    await this.BillService.existBill(updateOrder.billId);

    return this.OrderRepository.update({ id, updateOrder })
  }

  public async remove({ id }: RemoveOrder): Promise<void> {
    await this.OrderRepository.getById(id);

    await this.OrderRepository.remove({ id });
  }
}