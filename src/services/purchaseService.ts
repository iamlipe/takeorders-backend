import { Purchase } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { GetPurchaseById, NewPurchase, QueryPurchase, RemovePurchase, UpdatePurchase } from "../interfaces/Purchase";
import { PurchaseRepository } from "../repositories/purchaseRepository";
import { SpentRepository } from "../repositories/spentRepository";
import { ErrorHandler } from "../utils/errorHandler";

export class PurchaseService {
  private PurchaseRepository: PurchaseRepository;

  private SpentRepository: SpentRepository;

  constructor() {
    this.PurchaseRepository = new PurchaseRepository;
    this.SpentRepository = new SpentRepository;
  }

  public async create(newPurchase: NewPurchase): Promise<Purchase> {
    const existSpent = await this.SpentRepository.getById(newPurchase.spentId);

    if (!existSpent) {
      throw new ErrorHandler(StatusCodes.NOT_FOUND, "Unregistered spent");
    }

    return this.PurchaseRepository.create(newPurchase);
  }
  
  public async get(queryPurchase: QueryPurchase): Promise<Purchase []> {
    const existSpent = await this.SpentRepository.getById(queryPurchase.spentId);

    if (!existSpent) {
      throw new ErrorHandler(StatusCodes.NOT_FOUND, "Unregistered spent");
    }

    return this.PurchaseRepository.get(queryPurchase);
  }
  
  public async getById({ id }: GetPurchaseById): Promise<Purchase> {
    const existPurchase = await this.PurchaseRepository.getById({ id });

    if (!existPurchase) {
      throw new ErrorHandler(StatusCodes.NOT_FOUND, "Unregistered purchase");
    }

    return this.PurchaseRepository.getById({ id });
  }
  
  public async update({ id, updatePurchase }: UpdatePurchase): Promise<Purchase> {
    const existPurchase = await this.PurchaseRepository.getById({ id });

    if (!existPurchase) {
      throw new ErrorHandler(StatusCodes.NOT_FOUND, "Unregistered purchase");
    }

    const existSpent = await this.SpentRepository.getById(updatePurchase.spentId);

    if (!existSpent) {
      throw new ErrorHandler(StatusCodes.NOT_FOUND, "Unregistered spent");
    }

    return this.PurchaseRepository.update({ id, updatePurchase });
  }
  
  public async remove({ id }: RemovePurchase): Promise<void> {
    await this.PurchaseRepository.remove({ id });
  }
}