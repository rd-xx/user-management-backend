import { Request, Response } from 'express';

export default function Handle404Middleware(req: Request, res: Response) {
  res.status(404).send({ error: `Cannot ${req.method} ${req.url}` });
}
