import { Stock } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { GetStockById, NewStock, QueryStock } from "../interfaces/Stock";
import { StockRepository } from "../repositories/stockRepository";
import { ErrorHandler } from "../utils/errorHandler";
import { UserService } from "./userService";

export class StockService {
  private StockRepository: StockRepository;

  private UserService: UserService;

  constructor() {
    this.StockRepository = new StockRepository;
    this.UserService = new UserService;
  }

  public async create({ userId }: NewStock): Promise<{ id: string; }> {
    await this.UserService.existUser(userId);

    await this.alreadyExistStock(userId);

    return this.StockRepository.create(userId);
  }

  public async get(queryStock: QueryStock): Promise<Stock []> {
    await this.UserService.existUser(queryStock.userId);

    return this.StockRepository.get(queryStock);
  }

  public async getById({id}: GetStockById): Promise<Stock> {
    await this.existStock(id);

    return this.StockRepository.getById(id);
  }

  public async existStock(id: string): Promise<void> {
    const exist = await this.StockRepository.getById(id);

    if (!exist) { 
      throw new ErrorHandler(StatusCodes.NOT_FOUND, "Unregistered stock");
    }
  }

  public async alreadyExistStock(userId: string): Promise<void> {
    const alreadyExist = await this.StockRepository.get({ userId });

    if (alreadyExist) {
      throw new ErrorHandler(StatusCodes.CONFLICT, 'This user already has a stock registered');
    }
  }
}