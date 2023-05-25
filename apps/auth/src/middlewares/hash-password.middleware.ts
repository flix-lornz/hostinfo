import { Prisma } from '@hostinfo/auth-prisma';
import { hash } from 'bcrypt';

const SALT_ROUNDS = 12;

export const hashPassword =
  (actions: Prisma.PrismaAction[]): Prisma.Middleware =>
  async (params, next) => {
    //if action not in actions[] skip and call next
    if (!actions.includes(params.action)) return await next(params);

    //limit model only to User
    if (params.model != 'User') return await next(params);

    //{ password } => object destructuring
    //same as const password = params.args.data.password;
    const password = params.args?.data?.password as string | undefined;

    if (password == null) return await next(params);

    //overwrite data.psssword object with hashed password
    params.args.data.password = await hash(password, SALT_ROUNDS);
    //console.log(params.args.data.password);

    return await next(params);
  };
