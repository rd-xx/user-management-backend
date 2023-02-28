import { Request, Response, NextFunction } from 'express';

// export default function BaseMiddleware(
//   handle: (req: Request, res: Response, next: NextFunction) => Promise<void>
// ) {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       await handle(req, res, next);
//     } catch (err) {
//       next(err);
//     }
//   };
// }

const mw =
  (
    handle: (req: Request, res: Response, next: NextFunction) => Promise<void>
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handle(req, res, next);
    } catch (err) {
      next(err);
    }
  };

export default mw;
