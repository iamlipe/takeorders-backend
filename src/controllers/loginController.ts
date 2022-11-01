import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { loginSchema } from '../schemas/login';
import { LoginService } from '../services/loginService';

export class LoginController {
  public static login() {
    return async (req: Request, res: Response) => {
      const { email, password } = req.body;

      loginSchema.validate({ email, password });

      const result = await LoginService.login({ email, password });

      res.status(StatusCodes.OK).json(result);
    };
  }

  public static validate() {
    return async (req: Request, res: Response) => {
      const { authorization } = req.headers;

      if (!authorization) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: 'Token not found' });
      }

      const result = await LoginService.validate(authorization);

      res.status(StatusCodes.OK).send(result);
    };
  }
}