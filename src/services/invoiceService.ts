import { Invoice } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { GetInvoiceById, NewInvoice, QueryInvoice } from "../interfaces/Invoice";
import { InvoiceRepository } from "../repositories/invoiceRepository";
import { ErrorHandler } from "../utils/errorHandler";
import { UserService } from "./userService";

export class InvoiceService {
  private InvoiceRepository: InvoiceRepository;

  private UserService: UserService;

  constructor() {
    this.InvoiceRepository = new InvoiceRepository;
    this.UserService = new UserService;
  }

  public async create({ userId }: NewInvoice): Promise<{ id: string; }> {
    await this.UserService.existUser(userId);

    await this.alreadyExistInvoice(userId);

    return this.InvoiceRepository.create(userId);
  }

  public async get(queryInvoice: QueryInvoice): Promise<Invoice []> {
    await this.UserService.existUser(queryInvoice.userId);

    return this.InvoiceRepository.get(queryInvoice);
  }

  public async getById({ id }: GetInvoiceById): Promise<Invoice> {
    await this.existInvoice(id);

    return this.InvoiceRepository.getById(id);
  }

  public async existInvoice(id: string): Promise<void> {
    const exist = await this.InvoiceRepository.getById(id);

    if (!exist) { 
      throw new ErrorHandler(StatusCodes.NOT_FOUND, "Unregistered invoice");
    }
  }

  public async alreadyExistInvoice(userId: string): Promise<void> {
    const alreadyExist = await this.InvoiceRepository.getById(userId);

    if (alreadyExist) {
      throw new ErrorHandler(StatusCodes.CONFLICT, 'This user already has a invoice registered');
    }
  }
}