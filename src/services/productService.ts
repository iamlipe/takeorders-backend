import { Product } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { 
  GetProductById,
  NewProduct,
  QueryProducts,
  RemoveProduct,
  UpdateProduct,
} from "../interfaces/Product";
import { CategoryRepository } from "../repositories/categoryRespository";
import { ProductRepository } from "../repositories/productRepository";
import { StockRepository } from "../repositories/stockRepository";
import { ErrorHandler } from "../utils/errorHandler";

export class ProductService {
  private ProductRepository: ProductRepository;

  private StockRepository: StockRepository;

  private CateogryRepository: CategoryRepository;

  constructor() {
    this.ProductRepository = new ProductRepository;
    this.StockRepository = new StockRepository;
    this.CateogryRepository = new CategoryRepository;
  }

  public async create(newProduct: NewProduct): Promise<Product> {
    const alreadyExist = await this.ProductRepository.getByName(newProduct.name);

    if (alreadyExist) {
      throw new ErrorHandler(StatusCodes.CONFLICT, "This product is already registered")
    }

    const stockExist = await this.StockRepository.getById(newProduct.stockId);

    if (!stockExist) {
      throw new ErrorHandler(StatusCodes.NOT_FOUND, "Unregistered stock");
    }

    const categoryExist = await this.CateogryRepository.getById(newProduct.categoryId);

    if (!categoryExist) {
      throw new ErrorHandler(StatusCodes.NOT_FOUND, "Unregisrered category");
    }

    return this.ProductRepository.create(newProduct);
  }

  public async get(queryProducts: QueryProducts): Promise<Product []> {
    const existStock = this.StockRepository.getById(queryProducts.stockId);

    if (!existStock) {
      throw new ErrorHandler(StatusCodes.NOT_FOUND, 'Unregistered stock');
    }

    return this.ProductRepository.get(queryProducts);
  }

  public async getById({ id }: GetProductById): Promise<Product> {
    return this.ProductRepository.getById(id);
  }

  public async update({ id, updateProduct }: UpdateProduct): Promise<Product> {
    const exist = await this.ProductRepository.getById(id);

    if (!exist) {
      throw new ErrorHandler(StatusCodes.NOT_FOUND, "Unregistered product")
    }

    return this.ProductRepository.update({ id, updateProduct })
  }

  public async remove({ id }: RemoveProduct): Promise<void> {
    await this.ProductRepository.remove({ id })
  }
}
