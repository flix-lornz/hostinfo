import { RequestWithUser, handleHttpError } from '@hostinfo/node-common';
import axios from 'axios';
import { RequestHandler } from 'express';

export const auth =
  (): RequestHandler => async (req: RequestWithUser, res, next) => {
    try {
      await axios.get('http://localhost:3334/api/verify', {
        headers: { Authorization: req.headers.authorization },
      });

      next();
    } catch (err) {
      const { code, body } = handleHttpError(err);
      res.status(code).json(body);
    }
  };
