import { Category } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { NewCategory, QueryCategory } from "../interfaces/Category";
import { CategoryRepository } from "../repositories/categoryRespository";
import { ErrorHandler } from "../utils/errorHandler";
import { StockService } from "./stockService";

export class CategoryService {
  private CategoryRepository: CategoryRepository;

  private StockService: StockService;

  constructor() {
    this.CategoryRepository = new CategoryRepository;
    this.StockService = new StockService;
  }

  public async create(newCategory: NewCategory): Promise<Category> {
    await this.alreadyExistCategory(newCategory.name, newCategory.stockId);

    return this.CategoryRepository.create(newCategory);
  }

  public async get(queryCategory: QueryCategory): Promise<Category []> {
    await this.StockService.existStock(queryCategory.stockId);

    return this.CategoryRepository.get(queryCategory);
  }

  public async getById({ id }): Promise<Category> {
    await this.existCategory(id)

    return this.CategoryRepository.getById(id);
  }

  public async existCategory(id: string): Promise<void> {
    const exist = await this.CategoryRepository.getById(id);

    if (!exist) { 
      throw new ErrorHandler(StatusCodes.NOT_FOUND, "Unregistered category");
    }
  }

  public async alreadyExistCategory(name: string, stockId: string): Promise<void> {
    const alreadyExist = await this.CategoryRepository.getByName(name, stockId);

    if(alreadyExist) {
      throw new ErrorHandler(StatusCodes.CONFLICT, 'This category is already registered');
    }
  }
}