import { Spent } from '@prisma/client';
import { QuerySpent } from '../interfaces/Spent';
import { prisma } from '../utils/connection';

export class SpentRepository {
  private database = prisma;

  public async create(userId: string): Promise<{ id: string; }> {
    return this.database.spent.create({
      data: { userId },
      select: { id: true }
    });
  }

  public async get({ userId }: QuerySpent): Promise<Spent []> {
    return this.database.spent.findMany({
      where: { userId }
    });
  }

  public async getById(id: string): Promise<Spent> {
    return this.database.spent.findFirst({
      where: { id }
    })
  }
}