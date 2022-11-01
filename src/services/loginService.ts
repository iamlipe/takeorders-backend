import { StatusCodes } from 'http-status-codes';
import { Login } from '../interfaces/Login';
import { TokenData } from '../interfaces/Token';
import { LoginRepository } from '../repositories/loginRepository';
import ErrorDomain  from '../interfaces/Error';
import JWT from '../utils/jwt';

export class LoginService {
  public static async login(login: Login) {
    const user = await LoginRepository.getByEmail(login.email);

    if (!user) throw new ErrorDomain(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');

    const compare = await LoginRepository.comparePassword(login.password, user.password);

    if (!compare) throw new ErrorDomain(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');

    const token = new JWT().sign({ id: user.id, name: user.id });

    return { user, token };
  }

  public static async validate(token: string): Promise<string> {
    const user = new JWT().verify(token) as TokenData;

    if (!user) throw new ErrorDomain(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');

    return user.name;
  }
}