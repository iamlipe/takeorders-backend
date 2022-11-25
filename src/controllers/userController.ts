import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validateLogin } from '../validations/validateLogin';
import { validateRegister } from '../validations/validateRegister';
import { UserService } from '../services/userService';

export class UserController {
  private UserService: UserService;

  constructor() {
    this.UserService = new UserService();
  }

  public login = async(req: Request, res: Response) => {
    const login = req.body;

    await validateLogin(login);

    const result = await this.UserService.login(login);

    res.status(StatusCodes.OK).json(result);
  };

  public validate = async(req: Request, res: Response) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Token not found' });
    }

    const token = await this.UserService.validate(authorization);

    res.status(StatusCodes.OK).json({ token });
  };

  public register = async(req: Request, res: Response) => {
    const newUser = req.body;

    await validateRegister(newUser);

    const result = await this.UserService.register(newUser);

    res.status(StatusCodes.CREATED).json(result);
  };
}