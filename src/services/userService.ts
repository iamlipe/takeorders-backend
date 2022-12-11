import { User } from '@prisma/client';
import { compare, hash } from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import { Login } from '../interfaces/Login';
import { Register } from '../interfaces/Register';
import { TokenData } from '../interfaces/Token';
import { NewUser, Subscription } from '../interfaces/User';
import { UserRepository } from '../repositories/userRepository';
import { PlanService } from './planService';
import { ErrorHandler } from '../utils/errorHandler';
import JWT from '../utils/jwt';

export class UserService {
  private UserRepository: UserRepository;

  private PlanService: PlanService; 

  constructor() {
    this.UserRepository = new UserRepository;
    this.PlanService = new PlanService;
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
    if (!data.acceptedTheTerms) {
      throw new ErrorHandler(StatusCodes.NOT_ACCEPTABLE, 'User did not accept the terms')
    }

    await this.alreadyExistEmail(data.email);

    const newUser: NewUser = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: await hash(data.password, 8),
      typeAuth: data.typeAuth === 'google' || data.typeAuth === "apple" ? data.typeAuth : null,
      acceptedTheTerms: data.acceptedTheTerms,
    };

    const user = await this.UserRepository.create(newUser);

    const token = new JWT().sign({ id: user.id, name: user.name });

    return { user, token };
  }

  public async subscription({ userId, planId }: Subscription): Promise<User> {
    await this.existUser(userId)

    await this.PlanService.existPlan(planId);

    return this.UserRepository.subscription({ userId, planId });
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