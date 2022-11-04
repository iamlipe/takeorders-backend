import { Order } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import {
  GetOrderById,
  NewOrder,
  QueryOrder,
  RemoveOrder,
  UpdateOrder,
} from "../interfaces/Order";
import { BillRepository } from "../repositories/billRepository";
import { OrderRepository } from "../repositories/orderRepository";
import { ProductRepository } from "../repositories/productRepository";
import { ErrorHandler } from "../utils/errorHandler";

export class OrderService {
  private OrderRepository: OrderRepository;

  private ProductRepository: ProductRepository;

  private BillRepository: BillRepository;

  constructor() {
    this.OrderRepository = new OrderRepository;
    this.ProductRepository = new ProductRepository;
    this.BillRepository = new BillRepository();
  }

  public async create(newOrder: NewOrder): Promise<Order> {
    const existProduct = await this.ProductRepository.getById(newOrder.productId);

    if (!existProduct) {
      throw new ErrorHandler(StatusCodes.NOT_FOUND, "Unregistered product");
    }

    const existBill = await this.BillRepository.getById(newOrder.billId);

    if (!existBill) {
      throw new ErrorHandler(StatusCodes.NOT_FOUND, "Unregistered bill");
    }

    return this.OrderRepository.create(newOrder);
  }

  public async get(queryOrder: QueryOrder): Promise<Order []> {
    const existBill = this.BillRepository.getById(queryOrder.billId);

    if (!existBill) {
      throw new ErrorHandler(StatusCodes.NOT_FOUND, "Unregistered bill");
    }

    return this.OrderRepository.get(queryOrder);
  }

  public async getById({ id }: GetOrderById): Promise<Order> {
    return this.OrderRepository.getById(id);
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

    const existBill = await this.BillRepository.getById(updateOrder.billId);

    if (!existBill) {
      throw new ErrorHandler(StatusCodes.NOT_FOUND, "Unregistered bill")
    }

    return this.OrderRepository.update({ id, updateOrder })
  }

  public async remove({ id }: RemoveOrder): Promise<void> {
    await this.OrderRepository.remove({ id });
  }
}