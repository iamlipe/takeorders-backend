import { Category } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { NewCategory } from "../interfaces/Category";
import { CategoryRepository } from "../repositories/categoryRespository";
import { ErrorHandler } from "../utils/errorHandler";

export class CategoryService {
  private CategoryRepository: CategoryRepository;

  constructor() {
    this.CategoryRepository = new CategoryRepository;
  }

  public async create({ name }: NewCategory): Promise<{ id: string; }> {
    const alreadyExist = await this.CategoryRepository.getByName(name);

    if(alreadyExist) {
      throw new ErrorHandler(StatusCodes.CONFLICT, 'This category is already registered');
    }

    const result = await this.CategoryRepository.create(name);

    return result;
  }

  public async get(): Promise<Category []> {
    return this.CategoryRepository.get();
  }
}