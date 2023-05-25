import { PrismaClient } from '@hostinfo/auth-prisma';
import { hashPassword } from '../middlewares/hash-password.middleware';

const initPrisma = (): PrismaClient => {
  const client = new PrismaClient();

  //run $use only on PrismaActions 'create', 'update'
  client.$use(hashPassword(['create', 'update']));

  return client;
};

export const prisma = initPrisma();
