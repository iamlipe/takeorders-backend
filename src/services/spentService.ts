import { Spent } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { GetSpentById, NewSpent, QuerySpent } from "../interfaces/Spent";
import { SpentRepository } from "../repositories/spentRepository";
import { ErrorHandler } from "../utils/errorHandler";
import { UserService } from "./userService";

export class SpentService {
  private SpentRepository: SpentRepository;

  private UserService: UserService;

  constructor() {
    this.SpentRepository = new SpentRepository;
    this.UserService = new UserService;
  }

  public async create({ userId }: NewSpent): Promise<{ id: string; }> {
    await this.UserService.existUser(userId);

    await this.alreadyExistSpent(userId);

    return this.SpentRepository.create(userId);
  }

  public async get(querySpent: QuerySpent): Promise<Spent []> {
    await this.UserService.existUser(querySpent.userId);

    return this.SpentRepository.get(querySpent);
  }

  public async getById({ id }: GetSpentById): Promise<Spent> {
    await this.existSpent(id);

    return this.SpentRepository.getById(id)
  }

  public async existSpent(id: string): Promise<void> {
    const exist = await this.SpentRepository.getById(id);

    if (!exist) { 
      throw new ErrorHandler(StatusCodes.NOT_FOUND, "Unregistered spent");
    }
  }

  public async alreadyExistSpent(userId: string): Promise<void> {
    const alreadyExist = await this.SpentRepository.get({ userId });

    if (alreadyExist) {
      throw new ErrorHandler(StatusCodes.CONFLICT, 'This user already has a spent registered');
    }
  }
}