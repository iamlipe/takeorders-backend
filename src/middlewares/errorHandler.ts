import { ErrorRequestHandler } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import ErrorDomain from '../interfaces/Error';

export class ErrorHandler {
  public static domainError(): ErrorRequestHandler {
    return (err, _req, res, next) => {
      if (err instanceof ErrorDomain) {
        return res.status(err.code).json({
          message: err.message,
        });
      }

      if (err instanceof JsonWebTokenError) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: err.message,
        });
      }

      return next(err);
    };
  }

  public static serverError(): ErrorRequestHandler {
    return (err, _req, res) => {
      res.status(500).json({
        message: 'server error',
      });
    };
  }
}