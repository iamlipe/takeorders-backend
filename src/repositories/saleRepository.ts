import { Sale } from '@prisma/client';
import { NewSale, QuerySale, RemoveSale, UpdateSale } from '../interfaces/Sale';
import { prisma } from '../utils/connection';

export class SaleRepository {
  private database = prisma;

  public async create(newSale: NewSale): Promise<Sale> {
    return this.database.sale.create({
      data: { ...newSale, createdAt: new Date(), updatedAt: new Date() }
    })
  }

  public async get({ invoiceId }: QuerySale): Promise<Sale []> {
    return this.database.sale.findMany({
      where: { invoiceId }
    })
  }

  public async getById(id: string): Promise<Sale> {
    return this.database.sale.findFirst({
      where: { id }
    })
  }
  
  public async update({ id, updateSale }: UpdateSale) {
    return this.database.sale.update({
      where: { id },
      data: { ...updateSale, updatedAt: new Date() }
    })
  }
  
  public async remove({ id }: RemoveSale) {
    await this.database.sale.delete({
      where: { id }
    })
  }
}