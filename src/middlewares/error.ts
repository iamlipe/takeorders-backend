import { ErrorRequestHandler } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { ErrorHandler } from '../utils/errorHandler';
import { ValidationError } from 'yup';

export class Error {
  public static yupError(): ErrorRequestHandler {
    return (err, _req, res, next) => {
      if (err instanceof ValidationError) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ message: err.message });
      }

      return next(err);
    };
  }

  public static domainError(): ErrorRequestHandler {
    return (err, _req, res, next) => {
      if (err instanceof ErrorHandler) {
        return res.status(err.code).json({
          message: err.message
        });
      }

      if (err instanceof JsonWebTokenError) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: err.message
        });
      }

      return next(err);
    };
  }

  public static serverError(): ErrorRequestHandler {
    return (err, req, res, next) => {
      console.log(err);
      res.status(500).json({ message: 'server error'});
    };
  }
}