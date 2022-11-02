import { User } from '@prisma/client';
import { NewUser } from '../interfaces/User';
import { prisma } from '../utils/connection';

export class UserRepository {
  private database = prisma;

  public async getUserByEmail(email: string): Promise<User | null> {
    return this.database.user.findFirst({
      where: { email },
    });
  }

  public async createUser(newUser: NewUser): Promise<User | null> {
    return this.database.user.create({
      data: newUser,
      select: { id: true, name: true, email: true, phone: true, password: true }
    });
  }
}