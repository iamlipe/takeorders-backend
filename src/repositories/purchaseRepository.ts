import { Purchase } from '@prisma/client';
import { GetPurchaseById, NewPurchase, QueryPurchase, RemovePurchase, UpdatePurchase } from '../interfaces/Purchase';
import { prisma } from '../utils/connection';

export class PurchaseRepository {
  private database = prisma;

  public async create(newPurchase: NewPurchase): Promise<Purchase> {
    return this.database.purchase.create({
      data: { ...newPurchase, createdAt: new Date(), updatedAt: new Date() }
    })
  }

  public async get({ spentId }: QueryPurchase): Promise<Purchase []> {
    return this.database.purchase.findMany({
      where: { spentId }
    })
  }
  
  public async getById(id: string): Promise<Purchase> {
    return this.database.purchase.findFirst({
      where: { id }
    })
  }
  
  public async update({ id, updatePurchase }: UpdatePurchase): Promise<Purchase> {
    return this.database.purchase.update({
      where: { id },
      data: { ...updatePurchase, updatedAt: new Date() }
    })
  }
  
  public async remove({ id }: RemovePurchase): Promise<void> {
    await this.database.purchase.delete({
      where: { id }
    })
  }
}