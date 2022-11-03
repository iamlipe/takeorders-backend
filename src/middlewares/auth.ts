import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import JWT from '../utils/jwt';

export class Auth {
  public static headers() {
    return (req: Request, res: Response, next: NextFunction) => {
      const { authorization } = req.headers;

      if (!authorization) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: 'Token not found' });
      }

      next();
    };
  }

  public static jwt() {
    return (req: Request, _res: Response, next: NextFunction) => {
      const { authorization } = req.headers;

      new JWT().verify(authorization);

      next();
    };
  }
}