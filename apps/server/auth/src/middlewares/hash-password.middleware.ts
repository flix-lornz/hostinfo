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
    const password =
      params.args?.data?.password ?? params.args?.create?.password; //if params.args?.data?.password exist take password, else use ..create.password

    if (password == null) return await next(params); //if password not in data or create then  password undefined -> return

    //overwrite data.psssword object with hashed password
    (params.args.data ?? params.args.create).password = await hash(
      password,
      SALT_ROUNDS
    );
    //console.log(params.args.data.password);

    return await next(params);
  };

// import { Prisma } from '@hostinfo/auth-prisma';
// import { hash } from 'bcrypt';

// const SALT_ROUNDS = 12;

// export const hashPassword =
//   (actions: Prisma.PrismaAction[]): Prisma.Middleware =>
//   async (params, next) => {
//     if (!actions.includes(params.action)) return await next(params);
//     if (params.model !== 'User') return await next(params);

//     const password =
//       params.args?.data?.password ?? params.args?.create?.password;
//     if (password == null) return await next(params);

//     (params.args.data ?? params.args.create).password = await hash(
//       password,
//       SALT_ROUNDS
//     );

//     return await next(params);
//   };
