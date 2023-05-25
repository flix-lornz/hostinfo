import type { Request } from 'express';
import { UserDto } from '@hostinfo/dtos';
export interface RequestWithUser extends Request {
  user: UserDto;
}
