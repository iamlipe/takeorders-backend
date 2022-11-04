import { Product } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { 
  GetProductById,
  NewProduct,
  QueryProducts,
  RemoveProduct,
  UpdateProduct,
  UpdateProductImage,
} from "../interfaces/Product";
import { CategoryRepository } from "../repositories/categoryRespository";
import { ProductRepository } from "../repositories/productRepository";
import { StockRepository } from "../repositories/stockRepository";
import { ErrorHandler } from "../utils/errorHandler";
import { StockService } from "./stockService";
import { CategoryService } from './categoryService'

export class ProductService {
  private ProductRepository: ProductRepository;

  private StockService: StockService;

  private CategoryService: CategoryService;

  constructor() {
    this.ProductRepository = new ProductRepository;
    this.StockService = new StockService;
    this.CategoryService = new CategoryService;
  }

  public async create(newProduct: NewProduct): Promise<Product> {
    await this.alreadyExistProduct(newProduct.name);

    await this.StockService.existStock(newProduct.stockId);

    await this.CategoryService.existCategory(newProduct.categoryId);

    return this.ProductRepository.create(newProduct);
  }

  public async updateImage({ id, url }: UpdateProductImage): Promise<void> {
    await this.existProduct(id);

    await this.ProductRepository.updateImage({ id, url });
  }

  public async get(queryProducts: QueryProducts): Promise<Product []> {
    await this.StockService.existStock(queryProducts.stockId);

    return this.ProductRepository.get(queryProducts);
  }

  public async getById({ id }: GetProductById): Promise<Product> {
    await this.existProduct(id);

    return this.ProductRepository.getById(id);
  }

  public async existProduct(id: string): Promise<void> {
    const exist = await this.ProductRepository.getById(id);

    if (!exist) { 
      throw new ErrorHandler(StatusCodes.NOT_FOUND, "Unregistered product");
    }
  }

  public async alreadyExistProduct(name: string): Promise<void> {
    const alreadyExist = await this.ProductRepository.getByName(name);

    if (alreadyExist) {
      throw new ErrorHandler(StatusCodes.CONFLICT, "Already a product with this name registered")
    }
  }

  public async update({ id, updateProduct }: UpdateProduct): Promise<Product> {
    await this.existProduct(id);

    return this.ProductRepository.update({ id, updateProduct })
  }

  public async remove({ id }: RemoveProduct): Promise<void> {
    await this.existProduct(id);

    await this.ProductRepository.remove({ id })
  }
}
