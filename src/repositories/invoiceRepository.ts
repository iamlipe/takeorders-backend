import { Invoice } from '@prisma/client';
import { QueryInvoice } from '../interfaces/Invoice';
import { prisma } from '../utils/connection';

export class InvoiceRepository {
  private database = prisma;

  public async create(userId: string): Promise<{ id: string; }> {
    return this.database.invoice.create({
      data: { userId },
      select: { id: true }
    });
  }

  public async get({ userId }: QueryInvoice): Promise<Invoice[]> {
    return this.database.invoice.findMany({
      where: { userId }
    });
  }

  public async getById(id): Promise<Invoice> {
    return this.database.invoice.findFirst({
      where: { id }
    })
  }
}