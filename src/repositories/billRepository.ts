import { Bill, Order } from '@prisma/client';
import { QueryBill, NewBill, RemoveBill, UpdateBill, CloseBill, UpdateBillImage } from '../interfaces/Bill';
import { prisma } from '../utils/connection';

export class BillRepository {
  private database = prisma;

  public async create(newBill: NewBill): Promise<Bill> {
    return this.database.bill.create({
      data: { ...newBill, status: true }
    })
  }

  public async get({ userId, status }: QueryBill): Promise<Bill []> {
    const query = {
      userId,
      status: !!Number(status),
    }

    return this.database.bill.findMany({
      where: status !== undefined ? query : { userId }
    });
  }

  public async getById(id: string): Promise<Bill> {
    return this.database.bill.findFirst({
      where: { id }
    })
  }

  public async update({ id, updateBill }: UpdateBill): Promise<Bill> {
    return this.database.bill.update({
      where: { id },
      data: updateBill
    })
  }

  public async updateImage({ id, url }: UpdateBillImage): Promise<void> {
    await this.database.bill.update({
      where: { id },
      data: { image: url }
    })
  }

  public async closeBill({ id }: CloseBill): Promise<void> {
    return this.database.$transaction(async (t: any): Promise<void> => {
      const { orders, userId, name } = await t.bill.update({
        where: { id },
        data: { status: false },
        select: { orders: true, userId: true, name: true }
      })

      const { id: invoiceId } = await t.invoice.findFirst({
        where: { userId }
      })

      let totalPrice = 0;

      await Promise.all(orders.map(async(order: Order) => {
        const { quantitySold, price } = await t.product.findFirst({
          where: { id: order.productId }
        })

        await t.product.update({
          where: { id: order.productId },
          data: {  quantitySold: quantitySold + order.quantity }
        })

        totalPrice += price * order.quantity;
      }));

      await t.sale.create({
        data: {
          name: `Venda ${name.toLowerCase()}`,
          totalPrice,
          invoiceId,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      })
    })
  }

  public async remove({ id }: RemoveBill): Promise<void> {
    await this.database.bill.delete({
      where: { id }
    })
  }

};