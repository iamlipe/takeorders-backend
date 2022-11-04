import { Sale } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { GetSaleById, NewSale, QuerySale, RemoveSale, UpdateSale } from "../interfaces/Sale";
import { InvoiceRepository } from "../repositories/invoiceRepository";
import { SaleRepository } from "../repositories/saleRepository";
import { ErrorHandler } from "../utils/errorHandler";

export class SaleService {
  private SaleRepository: SaleRepository;

  private InvoiceRepository: InvoiceRepository;

  constructor() {
    this.SaleRepository = new SaleRepository;
    this.InvoiceRepository = new InvoiceRepository;
  }

  public async create(newSale: NewSale): Promise<Sale> {
    const existInvoice = await this.InvoiceRepository.getById(newSale.invoiceId);

    if (!existInvoice) {
      throw new ErrorHandler(StatusCodes.NOT_FOUND, "Unregistered invoice");
    }

    return this.SaleRepository.create(newSale);
  }

  public async get(querySale: QuerySale): Promise<Sale []> {
    const existInvoice = await this.InvoiceRepository.getById(querySale.invoiceId);

    if (!existInvoice) {
      throw new ErrorHandler(StatusCodes.NOT_FOUND, "Unregistered invoice");
    }

    return this.SaleRepository.get(querySale);
  }

  public async getById({ id }: GetSaleById): Promise<Sale> {
    return this.SaleRepository.getById(id);
  }

  public async update({ id, updateSale }: UpdateSale): Promise<Sale> {
    const existSale = await this.SaleRepository.getById(id);

    if (!existSale) {
      throw new ErrorHandler(StatusCodes.NOT_FOUND, "Unregistered sale");
    }

    const existInvoice = await this.InvoiceRepository.getById(updateSale.invoiceId);

    if (!existInvoice) {
      throw new ErrorHandler(StatusCodes.NOT_FOUND, "Unregistered invoice");
    }

    return this.SaleRepository.update({ id, updateSale });
  }

  public async remove({ id }: RemoveSale) {
    await this.SaleRepository.remove({ id });
  }
}