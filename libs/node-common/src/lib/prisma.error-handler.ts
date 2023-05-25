import { Prisma } from '@hostinfo/auth-prisma';
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
  RangeError,
  StatusError,
} from './status.error';

export function handlePrismaError(id?: string | number) {
  return (err: Prisma.PrismaClientKnownRequestError) => {
    console.error('PRISMA_ERROR', err);

    switch (err.code) {
      case 'P2001':
      case 'P2015':
      case 'P2018':
      case 'P2021':
      case 'P2022':
      case 'P2025':
        throw new NotFoundError(id);
      case 'P2002':
      case 'P2007':
      case 'P2023':
        throw new ConflictError(id);
      case 'P2006':
      case 'P2008':
      case 'P2009':
      case 'P2011':
      case 'P2012':
        throw new BadRequestError();
      case 'P2013':
        throw new StatusError(
          `Fields ${JSON.stringify(err.meta)} are required`,
          400
        );
      case 'P2020':
      case 'P2033':
        throw new RangeError();

      default:
        throw new StatusError('Something went wrong', 500);
    }
  };
}
