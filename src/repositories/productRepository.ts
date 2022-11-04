import { Product } from '@prisma/client';
import {
  NewProduct,
  QueryProducts,
  RemoveProduct,
  UpdateProduct,
  UpdateProductImage,
} from '../interfaces/Product';
import { prisma } from '../utils/connection';

export class ProductRepository {
  private database = prisma;

  public async create(newProduct: NewProduct): Promise<Product> {
    return this.database.product.create({
      data: { ...newProduct, quantitySold: 0 },
    });
  }

  public async updateImage({ id, url }: UpdateProductImage): Promise<void> {
    await this.database.product.update({
      where: { id },
      data: { image: url }
    })
  }

  public async get({ stockId }: QueryProducts): Promise<Product[]> {
    return this.database.product.findMany({
      where: { stockId }
    });
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

  public async update({ id, updateProduct }: UpdateProduct): Promise<Product> {
    return this.database.product.update({
      where: { id },
      data: { ...updateProduct },
    })
  }

  public async remove({ id }: RemoveProduct): Promise<void> {
    await this.database.product.delete({
      where: { id }
    })
  }
}