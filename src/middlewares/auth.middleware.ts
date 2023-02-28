import { JsonWebTokenError, JwtPayload, verify } from 'jsonwebtoken';
import { InvalidSessionError } from '../utils/errors';
import { security } from '../utils/constants';
import mw from './base.middleware';

const AuthMiddleware = mw(async (req, _, next) => {
  const { authorization } = req.headers;
  if (!authorization) throw new InvalidSessionError();

  try {
    const { payload } = verify(
      authorization.replace('Bearer ', ''),
      security.jwt.secret
    ) as JwtPayload;

    req.session = payload;
  } catch (err) {
    if (err instanceof JsonWebTokenError) throw new InvalidSessionError();
    throw err;
  }

  next();
});

export default AuthMiddleware;
