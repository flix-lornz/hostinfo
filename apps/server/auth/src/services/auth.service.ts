import { sign, verify } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import {
  BEARER_PREFIX,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from '@hostinfo/node-common';
import { LoginDto, UserDto } from '@hostinfo/dtos';
import { UserRepository, userRepo } from './user.repository';

//production secret - never hardcode
const SECRET = process.env.SECRET ?? 'secret-abc123';
const EXPIRATION = '1h';

class AuthService {
  constructor(private users: UserRepository) {}
  /**
   * 1. User logs in on Frontend
   * 2. Frontend sends gettToken /api/login request to Backend
   * 3. Backend creates  token
   * 4. Backend sends created token back to FE
   */

  public async createToken({ username, password }: LoginDto) {
    const user = await this.users.getUserByUsername(username);
    if (!user) throw new NotFoundError();

    const isValidPwd = await compare(password, user.password);
    if (!isValidPwd) throw new UnauthorizedError();

    return sign({ sub: user.id }, SECRET, {
      expiresIn: EXPIRATION,
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

  public async validateToken(
    bearer: `${typeof BEARER_PREFIX}${string}`
  ): Promise<UserDto> {
    //split produces array. 1. index is empty since 'Bearer ' is beginning of string
    const [, token] = bearer.split('Bearer ');
    const payload = verify(token, SECRET, {
      maxAge: EXPIRATION,
      algorithms: ['HS256'],
    });

    if (typeof payload === 'string' || payload.sub == null)
      throw new ForbiddenError();

    const user = await this.users.getUser(+payload.sub);
    if (!user) throw new ForbiddenError();
    //console.log(token);
    return user;
  }
}

export const authService = new AuthService(userRepo);
