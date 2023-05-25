import { RequestHandler } from 'express';
import { authService } from '../services/auth.service';
import {
  BEARER_PREFIX,
  ForbiddenError,
  RequestWithUser,
  handleHttpError,
} from '@hostinfo/node-common';

const isBearerString = (
  maybeBearer: string
): maybeBearer is `${typeof BEARER_PREFIX}${string}` =>
  maybeBearer.startsWith(BEARER_PREFIX);

export const auth =
  (): RequestHandler => async (req: RequestWithUser, res, next) => {
    try {
      const bearer = req.headers.authorization;

      if (!bearer) throw new ForbiddenError();
      if (!isBearerString(bearer)) throw new ForbiddenError();

      req.user = await authService.validateToken(bearer);

      return next();
    } catch (err) {
      const { code, body } = handleHttpError(err);
      return res.status(code).json(body);
    }
  };
