import { Stock } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { GetStockById, NewStock, QueryStock } from "../interfaces/Stock";
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
      throw new ErrorHandler(StatusCodes.NOT_FOUND, 'Unregistered user');
    }

    const stock = await this.StockRepository.get({ userId });

    if (stock) {
      throw new ErrorHandler(StatusCodes.CONFLICT, 'This user already has a stock registered');
    }

    const result = await this.StockRepository.create(userId);

    return result;
  }

  public async get(queryStock: QueryStock): Promise<Stock []> {
    const existUser = await this.UserRepository.getById(queryStock.userId);

    if (!existUser) {
      throw new ErrorHandler(StatusCodes.NOT_FOUND, "Unregistered user");
    }

    return this.StockRepository.get(queryStock);
  }

  public async getById({id}: GetStockById): Promise<Stock> {
    return this.StockRepository.getById(id);
  }
}