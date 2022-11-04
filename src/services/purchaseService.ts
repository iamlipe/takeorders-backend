import { Purchase } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import {
  GetPurchaseById,
  NewPurchase,
  QueryPurchase,
  RemovePurchase,
  UpdatePurchase,
} from "../interfaces/Purchase";
import { PurchaseRepository } from "../repositories/purchaseRepository";
import { ErrorHandler } from "../utils/errorHandler";
import { SpentService } from "./spentService";

export class PurchaseService {
  private PurchaseRepository: PurchaseRepository;

  private SpentService: SpentService;

  constructor() {
    this.PurchaseRepository = new PurchaseRepository;
    this.SpentService = new SpentService;
  }

  public async create(newPurchase: NewPurchase): Promise<Purchase> {
    await this.SpentService.existSpent(newPurchase.spentId);

    return this.PurchaseRepository.create(newPurchase);
  }
  
  public async get(queryPurchase: QueryPurchase): Promise<Purchase []> {
    await this.SpentService.existSpent(queryPurchase.spentId);

    return this.PurchaseRepository.get(queryPurchase);
  }
  
  public async getById({ id }: GetPurchaseById): Promise<Purchase> {
    await this.existPurchase(id);

    return this.PurchaseRepository.getById(id);
  }

  public async existPurchase(id: string): Promise<void> {
    const exist = await this.PurchaseRepository.getById(id);

    if (!exist) { 
      throw new ErrorHandler(StatusCodes.NOT_FOUND, "Unregistered purchase");
    }
  }
  
  public async update({ id, updatePurchase }: UpdatePurchase): Promise<Purchase> {
    await this.existPurchase(id);

    await this.SpentService.existSpent(updatePurchase.spentId);

    return this.PurchaseRepository.update({ id, updatePurchase });
  }
  
  public async remove({ id }: RemovePurchase): Promise<void> {
    await this.existPurchase(id);

    await this.PurchaseRepository.remove({ id });
  }
}