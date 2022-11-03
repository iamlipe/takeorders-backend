import { Invoice } from '@prisma/client';
import { prisma } from '../utils/connection';

export class InvoiceRepository {
  private database = prisma;

  public async create(userId: string): Promise<{ id: string; }> {
    return this.database.invoice.create({
      data: { userId },
      select: { id: true }
    });
  }

  public async get(): Promise<Invoice[]> {
    return this.database.invoice.findMany();
  }
}