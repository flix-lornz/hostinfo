import { PrismaClient, Prisma, User } from '@hostinfo/auth-prisma';
import { UserDto } from '@hostinfo/dtos';
import { prisma } from './prisma.service';
import { handlePrismaError } from '@hostinfo/node-common';

const select = { id: true, username: true };

export class UserRepository {
  constructor(private users: PrismaClient['user']) {}

  public createUser(userDto: Prisma.UserCreateInput): Promise<UserDto> {
    return this.users
      .create({ data: userDto, select })
      .catch(handlePrismaError());
  }

  public getAllUsers(): Promise<UserDto[]> {
    return this.users.findMany({ select }).catch(handlePrismaError());
  }

  //UserDto: username, id, no pwd
  public getUser(id: User['id']): Promise<UserDto> {
    return this.users
      .findUniqueOrThrow({
        where: { id },
        select,
      })
      .catch(handlePrismaError(id));
  }

  public getUserByUsername(username: User['username']): Promise<User> {
    return this.users
      .findUniqueOrThrow({
        where: { username },
      })
      .catch(handlePrismaError(username));
  }

  public updateUser(
    id: User['id'],
    userDto: Prisma.UserUpdateInput
  ): Promise<UserDto> {
    return this.users
      .update({ where: { id }, data: userDto, select })
      .catch(handlePrismaError(id));
  }

  public async deleteUser(id: User['id']): Promise<UserDto[]> {
    await this.users
      .delete({ where: { id }, select })
      .catch(handlePrismaError(id));
    return this.getAllUsers();
  }
}

export const userRepo = new UserRepository(prisma.user);
