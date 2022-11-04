import { Stock } from '@prisma/client';
import { QueryStock } from '../interfaces/Stock';
import { prisma } from '../utils/connection';

export class StockRepository {
  private database = prisma;

  public async create(userId: string): Promise<{ id: string; }> {
    return this.database.stock.create({
      data: { userId },
      select: { id: true }
    });
  }

  public async get({ userId }: QueryStock): Promise<Stock[]> {
    return this.database.stock.findMany({
      where: { userId }
    });
  }

  public async getById(id: string): Promise<Stock> {
    return this.database.stock.findFirst({
      where: { id }
    })
  }
}