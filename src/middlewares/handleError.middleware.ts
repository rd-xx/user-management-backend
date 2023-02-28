import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';

export default function HandleErrorMiddleware(
  err: Error,
  _: Request,
  res: Response,
  __: NextFunction
) {
  if (err instanceof AppError)
    return res
      .status(err.httpCode!)
      .send({ error: err.errors, errorCode: err.errorCode });

  console.log(err);
  res.status(500).send({ error: err.message, errorCode: 500 });
}
