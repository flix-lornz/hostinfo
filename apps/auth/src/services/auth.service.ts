import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { PrismaClient, User } from '@hostinfo/auth-prisma';
import {
  BEARER_PREFIX,
  NotFoundError,
  UnauthorizedError,
} from '@hostinfo/node-common';
import { LoginDto } from '@hostinfo/dtos';
import { prisma } from './prisma.service';

const SECRET = process.env.SECRET ?? 'secret-abc123';

class AuthService {
  constructor(private users: PrismaClient['user']) {}
  /**
   * 1. User logs in on Frontend
   * 2. Frontend sends gettToken /api/login request to Backend
   * 3. Backend creates  token
   * 4. Backend sends created token back to FE
   */

  public async createToken({ username, password }: LoginDto) {
    // const user = await this.users.findUnique({ where: { username } });
    // if (!user) throw new NotFoundError();

    // const isValidPwd = compare(password, user.password);
    // if (!isValidPwd) throw new UnauthorizedError();

    return sign({ sub: 1 }, SECRET, {
      expiresIn: '1h',
      algorithm: 'HS256',
    });
  }

  /**
   * 1. User is logged in and has token stored in Frontend
   * 2. User wants to use restricted API
   * 3. User sends JWT via authorized header to BE
   * 4. BE gets token from  Authorization header
   * 5. BE validates token
   * 6. Execute API function
   */

  public validateToken(
    bearer: `${typeof BEARER_PREFIX} ${string}`
  ): Promise<User> {
    //split produces array. 1. index is empty since 'Bearer ' is beginning of string
    const [, token] = bearer.split('Bearer ');
    console.log(token);
    return user;
  }
}

export const authService = new AuthService(prisma.user);
