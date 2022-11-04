import { Category } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { NewCategory, QueryCategory } from "../interfaces/Category";
import { CategoryRepository } from "../repositories/categoryRespository";
import { StockRepository } from "../repositories/stockRepository";
import { ErrorHandler } from "../utils/errorHandler";

export class CategoryService {
  private CategoryRepository: CategoryRepository;

  private StockRepository: StockRepository;

  constructor() {
    this.CategoryRepository = new CategoryRepository;
    this.StockRepository = new StockRepository;
  }

  public async create(NewCategory: NewCategory): Promise<Category> {
    const alreadyExist = await this.CategoryRepository
      .getByName(NewCategory.name, NewCategory.stockId);

    if(alreadyExist) {
      throw new ErrorHandler(StatusCodes.CONFLICT, 'This category is already registered');
    }

    const result = await this.CategoryRepository.create(NewCategory);

    return result;
  }

  public async get(queryCategory: QueryCategory): Promise<Category []> {
    const existStock = await this.StockRepository.getById(queryCategory.stockId);

    if (!existStock) {
      throw new ErrorHandler(StatusCodes.NOT_FOUND, "Unregistered stock")
    }

    return this.CategoryRepository.get(queryCategory);
  }

  public async getById({ id }): Promise<Category> {
    return this.CategoryRepository.getById(id);
  }
}