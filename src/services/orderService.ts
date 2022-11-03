import { Order } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { NewOrder, RemoveOrder, UpdateOrder } from "../interfaces/Order";
import { OrderRepository } from "../repositories/orderRepository";
import { ProductRepository } from "../repositories/productRepository";
import { ErrorHandler } from "../utils/errorHandler";

export class OrderService {
  private OrderRepository: OrderRepository;

  private ProductRepository: ProductRepository;

  constructor() {
    this.OrderRepository = new OrderRepository;
    this.ProductRepository = new ProductRepository;
  }

  public async create(newOrder: NewOrder): Promise<Order> {
    const existProduct = await this.ProductRepository.getById(newOrder.productId);

    if (!existProduct) {
      throw new ErrorHandler(StatusCodes.NOT_FOUND, "Unregistered product")
    }

    return this.OrderRepository.create(newOrder);
  }

  public async get(): Promise<Order []> {
    return this.OrderRepository.get();
  }

  public async update({ id, updateOrder }: UpdateOrder): Promise<Order> {
    const existOrder = await this.OrderRepository.getById(id);

    if(!existOrder) {
      throw new ErrorHandler(StatusCodes.NOT_FOUND, "Unregistered order");
    }

    const existProduct = await this.ProductRepository.getById(updateOrder.productId);

    if (!existProduct) {
      throw new ErrorHandler(StatusCodes.NOT_FOUND, "Unregistered product")
    }

    return this.OrderRepository.update({ id, updateOrder })
  }

  public async remove({ id }: RemoveOrder): Promise<void> {
    await this.OrderRepository.remove({ id });
  }
}