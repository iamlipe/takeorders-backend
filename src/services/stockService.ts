import { Stock } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { NewStock } from "../interfaces/Stock";
import { StockRepository } from "../repositories/stockRepository";
import { UserRepository } from "../repositories/userRepository";
import { ErrorHandler } from "../utils/errorHandler";

export class StockService {
  private StockRepository: StockRepository;

  private UserRepository: UserRepository;

  constructor() {
    this.StockRepository = new StockRepository;
    this.UserRepository = new UserRepository;
  }

  public async create({ userId }: NewStock): Promise<{ id: string; }> {
    const user = await this.UserRepository.getById(userId);

    if(!user) {
      throw new ErrorHandler(StatusCodes.NOT_FOUND, 'unregistered user');
    }

    const stock = await this.StockRepository.getByUserId(userId);

    if (stock) {
      throw new ErrorHandler(StatusCodes.CONFLICT, 'This user already has a stock registered');
    }

    const result = await this.StockRepository.create(userId);

    return result;
  }

  public async get(): Promise<Stock []> {
    return this.StockRepository.get();
  }
}