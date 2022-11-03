import { Stock } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
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

  public async create(userId: string): Promise<{ id: string; }> {
    const user = await this.UserRepository.getById(userId);

    if(!user) {
      throw new ErrorHandler(StatusCodes.NOT_FOUND, 'unregistered user');
    }

    const result = await this.StockRepository.create(userId);

    return result;
  }

  public async get(): Promise<Stock []> {
    return this.StockRepository.get();
  }
}