import { RequestWithUser } from '../models/request-with-user.model';

//middleware = handlerfunction

/*for auth of Roles user or admin for later implementation*/
// type Role = 'user' | 'admin';

/* adding options for Role*/
// export const authMiddleware =
// (options: { roles: Role[] }) =>
// (req: RequestWithUser, res, next) => {
// console.info(req.ip);

export const authMiddleware = () => (req: RequestWithUser, res, next) => {
  const user = { name: 'Fiz Ronzel' };
  req.user = user;

  next();
};
