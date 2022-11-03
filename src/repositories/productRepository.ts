import { Product } from '@prisma/client';
import { NewProduct, RemoveProduct, UpdateProduct } from '../interfaces/Product';
import { prisma } from '../utils/connection';

export class ProductRepository {
  private database = prisma;

  public async create(newProduct: NewProduct): Promise<Product> {
    return this.database.product.create({
      data: { ...newProduct, quantitySold: 0 },
    });
  }

  public async get(): Promise<Product[]> {
    return this.database.product.findMany();
  }

  public async getByName(name: string): Promise<Product> {
    return this.database.product.findFirst({
      where: { name }
    })
  }

  public async getById(id: string): Promise<Product> {
    return this.database.product.findFirst({
      where: { id }
    })
  }

  public async update({ id, updatedProduct }: UpdateProduct): Promise<Product> {
    return this.database.product.update({
      where: { id },
      data: updatedProduct,
    })
  }

  public async remove({ id }: RemoveProduct): Promise<void> {
    await this.database.product.delete({
      where: { id }
    })
  }
}