import { Category } from '@prisma/client';
import { NewCategory, QueryCategory } from '../interfaces/Category';
import { prisma } from '../utils/connection';

export class CategoryRepository {
  private database = prisma;

  public async create(newCategory: NewCategory): Promise<Category> {
    return this.database.category.create({
      data: newCategory,
    });
  }

  public async get({ stockId }: QueryCategory): Promise<Category []> {
    return this.database.category.findMany({
      where: { stockId }
    });
  }
  
  public async getByName(name: string, stockId: string): Promise<Category> {
    return this.database.category.findFirst({
      where: { name, stockId }
    });
  }

  public async getById(id: string): Promise<Category> {
    return this.database.category.findFirst({
      where: { id }
    })
  }
}