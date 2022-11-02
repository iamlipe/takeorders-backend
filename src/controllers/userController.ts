import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { loginSchema } from '../schemas/login';
import { registerSchema } from '../schemas/register';
import { UserService } from '../services/userService';

export class UserController {
  private UserService: UserService;

  constructor() {
    this.UserService = new UserService();
  }

  public login = async(req: Request, res: Response) => {
    const { email, password } = req.body;

    await loginSchema.validate({ email, password });

    const result = await this.UserService.login({ email, password });

    res.status(StatusCodes.OK).json(result);
  };

  public validate = async(req: Request, res: Response) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Token not found' });
    }

    const result = await this.UserService.validate(authorization);

    res.status(StatusCodes.OK).send(result);
  };

  public register = async(req: Request, res: Response) => {
    const { name, email, phone, password, confirmPassword } = req.body;

    const newUser = {
      name,
      email,
      phone,
      password,
      confirmPassword
    };

    await registerSchema.validate(newUser);

    const result = await this.UserService.register(newUser);

    res.status(StatusCodes.CREATED).json(result);
  };
}