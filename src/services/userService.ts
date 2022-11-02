import { compare, hash } from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import { Login } from '../interfaces/Login';
import { Register } from '../interfaces/Register';
import { TokenData } from '../interfaces/Token';
import { NewUser } from '../interfaces/User';
import { UserRepository } from '../repositories/userRepository';
import { ErrorHandler } from '../utils/errorHandler';
import JWT from '../utils/jwt';

export class UserService {
  private UserRepository: UserRepository;

  constructor() {
    this.UserRepository = new UserRepository;
  }

  public async login(login: Login) {
    const user = await this.UserRepository.getUserByEmail(login.email);
    
    if(!user) {
      throw new ErrorHandler(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
    }

    const comparePassword = await compare(login.password, user.password);

    if (!comparePassword) {
      throw new ErrorHandler(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
    }

    const token = new JWT().sign({ id: user.id, name: user.name });
  
    return { user, token };
  }

  public async validate(hashToken: string) {
    const result = new JWT().verify(hashToken) as TokenData;

    if (!result) {
      throw new ErrorHandler(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
    };

    return result;
  };

  public async register(data: Register) {
    const alreadyExist = await this.UserRepository.getUserByEmail(data.email);

    if(alreadyExist) {
      throw new ErrorHandler(StatusCodes.CONFLICT, "This email is already registered");
    }

    const newUser: NewUser = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: await hash(data.password, 8)
    };

    const user = await this.UserRepository.createUser(newUser);

    const token = new JWT().sign({ id: user.id, name: user.name });

    return { user, token };
  }
}