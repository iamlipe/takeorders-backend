import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import JWT from '../utils/jwt';

export default class Auht {
  public static jwt() {
    return (req: Request, res: Response, next: NextFunction) => {
      const { authorization } = req.headers;

      if (!authorization) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: 'Token not found' });
      }

      new JWT().verify(authorization);

      next();
    };
  }
}