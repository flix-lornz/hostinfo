import { AxiosError } from 'axios';
import { StatusError } from './status.error';
import { JsonWebTokenError } from 'jsonwebtoken';

export function handleHttpError(
  err: StatusError | AxiosError | JsonWebTokenError | Error
): {
  code: number;
  body: { message: string };
} {
  console.error('HTTP_ERROR', err);
  if (err instanceof StatusError)
    return { code: err.code ?? 500, body: { message: err.message } };

  if (err instanceof JsonWebTokenError)
    return { code: 403, body: { message: err.message } };

  if (err instanceof AxiosError)
    return {
      code: err.response?.status ?? 500,
      body: err.response?.data ?? { message: err.message },
    };

  return { code: 500, body: { message: err.message } };
}
