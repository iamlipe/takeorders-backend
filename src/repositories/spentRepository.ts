import { Spent } from '@prisma/client';
import { prisma } from '../utils/connection';

export class SpentRepository {
  private database = prisma;

  public async create(userId: string): Promise<{ id: string; }> {
    return this.database.spent.create({
      data: { userId },
      select: { id: true }
    });
  }

  public async getByUserId(userId: string): Promise<Spent> {
    return this.database.spent.findFirst({
      where: { userId }
    });
  }

  public async get(): Promise<Spent[]> {
    return this.database.spent.findMany();
  }
}