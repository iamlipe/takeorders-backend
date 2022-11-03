import { Category } from '@prisma/client';
import { prisma } from '../utils/connection';

export class CategoryRepository {
  private database = prisma;

  public async create(name: string): Promise<{ id: string; }> {
    return this.database.category.create({
      data: { name },
      select: { id: true }
    });
  }

  public async getByName(name: string): Promise<Category> {
    return this.database.category.findFirst({
      where: { name }
    });
  }

  public async get(): Promise<Category[]> {
    return this.database.category.findMany();
  }
}