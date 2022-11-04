import { Spent } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { GetSpentById, NewSpent, QuerySpent } from "../interfaces/Spent";
import { SpentRepository } from "../repositories/spentRepository";
import { UserRepository } from "../repositories/userRepository";
import { ErrorHandler } from "../utils/errorHandler";

export class SpentService {
  private SpentRepository: SpentRepository;

  private UserRepository: UserRepository;

  constructor() {
    this.SpentRepository = new SpentRepository;
    this.UserRepository = new UserRepository;
  }

  public async create({ userId }: NewSpent): Promise<{ id: string; }> {
    const user = await this.UserRepository.getById(userId);

    if(!user) {
      throw new ErrorHandler(StatusCodes.NOT_FOUND, 'Unregistered user');
    }

    const spent = await this.SpentRepository.get({ userId });

    if (spent) {
      throw new ErrorHandler(StatusCodes.CONFLICT, 'This user already has a spent registered');
    }

    const result = await this.SpentRepository.create(userId);

    return result;
  }

  public async get(querySpent: QuerySpent): Promise<Spent []> {
    const existUser = await this.UserRepository.getById(querySpent.userId);

    if (!existUser) {
      throw new ErrorHandler(StatusCodes.NOT_FOUND, "Unregistered user");
    }

    return this.SpentRepository.get(querySpent);
  }

  public async getById({ id }: GetSpentById): Promise<Spent> {
    return this.SpentRepository.getById(id)
  }
}