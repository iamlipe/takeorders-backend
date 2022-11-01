import { User } from '@prisma/client';
import { compare } from 'bcryptjs';
import { prisma } from '../database';

export class LoginRepository {
  public static async getByEmail(email: string): Promise<User | null> {
    return prisma.user.findFirst({
      where: { email },
    });
  }

  public static async comparePassword(password: string, hash: string) {
    return compare(password, hash);
  }
}