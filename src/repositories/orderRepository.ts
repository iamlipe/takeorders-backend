import { prisma } from '../utils/connection';
import { 
  NewOrder,
  QueryOrder,
  RemoveOrder,
  UpdateOrder,
} from "../interfaces/Order";
import { Order } from '@prisma/client';

export class OrderRepository {
  private database = prisma;

  public async create(newOrder: NewOrder): Promise<Order> {
    return this.database.order.create({
      data: { ...newOrder, createdAt: new Date(), updatedAt: new Date() },
    })
  }

  public async get({ billId }: QueryOrder): Promise<Order []> {
    return this.database.order.findMany({
      where: { billId }
    });
  }

  public async getById(id: string): Promise<Order> {
    return this.database.order.findFirst({
      where: { id }
    })
  }

  public async update({ id, updateOrder }: UpdateOrder): Promise<Order> {
    return this.database.order.update({
      where: { id },
      data: { ...updateOrder, updatedAt: new Date()}
    })
  }

  public async remove({ id }: RemoveOrder): Promise<void> {
    await this.database.order.delete({
      where: { id }
    })
  }

}