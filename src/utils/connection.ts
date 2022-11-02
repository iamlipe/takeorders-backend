import { PrismaClient,  } from '@prisma/client';

import { config } from 'dotenv';

config({ path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env' });

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
});

export { prisma };