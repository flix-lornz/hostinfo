import { PrismaClient, Prisma } from '@hostinfo/auth-prisma';
import { hashPassword } from '../middlewares/hash-password.middleware';

//for db seeding
const admin: Prisma.UserCreateInput = {
  username: 'root',
  password: 'root',
};

const initPrisma = (): PrismaClient => {
  const client = new PrismaClient();

  //run $use only on PrismaActions 'create', 'update'
  client.$use(hashPassword(['create', 'update', 'upsert']));

  //db seeding user admin
  client.user
    .upsert({
      where: { username: admin.username }, //select admin by username
      update: {}, // if exist, update with {} nothing
      create: admin, // if not exist create admin
    })
    .then(() => {
      console.log('USER CREATED');
    })
    .catch((err) => console.error('ERROR WHILE CREATING USER', err));

  return client;
};

export const prisma = initPrisma();

// import { PrismaClient, Prisma } from '@hostinfo/auth-prisma';
// import { hashPassword } from '../middlewares/hash-password.middleware';

// const admin: Prisma.UserCreateInput = {
//   username: 'admin',
//   password: 'root',
// };

// const initPrimsa = (): PrismaClient => {
//   const client = new PrismaClient();

//   client.$use(hashPassword(['create', 'update', 'upsert']));

//   console.log('CREATING USER');
//   client.user
//     .upsert({
//       where: { username: admin.username },
//       update: {},
//       create: admin,
//     })
//     .then(() => {
//       console.log('USER CREATED');
//     })
//     .catch((err) => console.error('ERROR WHILE CREATING USER', err));

//   return client;
// };

// export const prisma = initPrimsa();
