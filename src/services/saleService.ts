import { Sale } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import {
  GetSaleById,
  NewSale,
  QuerySale,
  RemoveSale,
  UpdateSale,
} from "../interfaces/Sale";
import { SaleRepository } from "../repositories/saleRepository";
import { ErrorHandler } from "../utils/errorHandler";
import { InvoiceService } from "./invoiceService";

export class SaleService {
  private SaleRepository: SaleRepository;

  private InvoiceService: InvoiceService;

  constructor() {
    this.SaleRepository = new SaleRepository;
    this.InvoiceService = new InvoiceService;
  }

  public async create(newSale: NewSale): Promise<Sale> {
    await this.InvoiceService.existInvoice(newSale.invoiceId);

    return this.SaleRepository.create(newSale);
  }

  public async get(querySale: QuerySale): Promise<Sale []> {
    await this.InvoiceService.existInvoice(querySale.invoiceId);

    return this.SaleRepository.get(querySale);
  }

  public async getById({ id }: GetSaleById): Promise<Sale> {
    await this.existSale(id);

    return this.SaleRepository.getById(id);
  }
  
  public async existSale(id: string): Promise<void> {
    const exist = await this.SaleRepository.getById(id);

    if (!exist) { 
      throw new ErrorHandler(StatusCodes.NOT_FOUND, "Unregistered sale");
    }
  }

  public async update({ id, updateSale }: UpdateSale): Promise<Sale> {
    await this.existSale(id);

    await this.InvoiceService.existInvoice(updateSale.invoiceId);

    return this.SaleRepository.update({ id, updateSale });
  }

  public async remove({ id }: RemoveSale) {
    await this.existSale(id);

    await this.SaleRepository.remove({ id });
  }
}