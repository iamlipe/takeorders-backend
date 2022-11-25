import { User } from '@prisma/client';
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
    const user = await this.getByEmail(login.email);

    await this.comparePassword(login.password, user.password);

    const token = new JWT().sign({ id: user.id, name: user.name });
  
    return { user, token };
  }

  public async validate(hashToken: string) {
    const user = new JWT().verify(hashToken) as TokenData;
    
    if (!user) {
      throw new ErrorHandler(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
    };

    const token = new JWT().sign({ id: user.id, name: user.name });

    return token;
  };

  public async register(data: Register) {
    await this.alreadyExistEmail(data.email);

    const newUser: NewUser = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: await hash(data.password, 8)
    };

    const user = await this.UserRepository.create(newUser);

    const token = new JWT().sign({ id: user.id, name: user.name });

    return { user, token };
  }

  public async getByEmail(email: string): Promise<User> {
    const user = await this.UserRepository.getByEmail(email);
    
    if(!user) {
      throw new ErrorHandler(StatusCodes.NOT_FOUND, 'Incorrect email or password');
    }

    return user;
  }

  public async existUser(id: string): Promise<void> {
    const exist = await this.UserRepository.getById(id);

    if (!exist) { 
      throw new ErrorHandler(StatusCodes.NOT_FOUND, "Unregistered user");
    }
  }

  private async alreadyExistEmail(email: string): Promise<void> {
    const alreadyExist = await this.UserRepository.getByEmail(email);

    if(alreadyExist) {
      throw new ErrorHandler(StatusCodes.CONFLICT, "This email is already registered");
    }
  }

  private async comparePassword(password: string, hash: string): Promise<void> {
    const comparePassword = await compare(password, hash);

    if (!comparePassword) {
      throw new ErrorHandler(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
    }
  }
}