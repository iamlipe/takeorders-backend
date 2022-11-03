import { Stock } from '@prisma/client';
import { prisma } from '../utils/connection';

export class StockRepository {
  private database = prisma;

  public async create(userId: string): Promise<{ id: string; }> {
    return this.database.stock.create({
      data: { userId },
      select: { id: true }
    });
  }

  public async get(): Promise<Stock[]> {
    return this.database.stock.findMany();
  }
}