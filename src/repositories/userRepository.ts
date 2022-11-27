import { User } from '@prisma/client';
import { NewUser } from '../interfaces/User';
import { prisma } from '../utils/connection';

export class UserRepository {
  private database = prisma;

  public async create(newUser: NewUser): Promise<User> {
    const categories = ['Bebida alcoólica', 'Bebida não alcoólica', 'Aperitivo', 'Outros'];

    return this.database.$transaction(async (t: any): Promise<User> => {
      const user = await t.user.create({
        data: newUser,
      });
  
      const stock = await t.stock.create({
        data: { userId: user.id }
      })

      await t.spent.create({
        data: { userId: user.id }
      })

      await t.invoice.create({
        data: { userId: user.id }
      })

      await Promise.all(categories.map(async(category) => {
        await t.category.create({
          data: {
            name: category,
            stockId: stock.id
          }
        })
      }));

      return user;
    });
  }

  public async getByEmail(email: string): Promise<User | null> {
    return this.database.user.findFirst({
      where: { email },
    });
  }

  public async getById(id: string): Promise<User | null> {
    return this.database.user.findFirst({
      where: { id },
    });
  }
}