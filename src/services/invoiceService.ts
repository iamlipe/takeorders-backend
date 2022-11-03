import { Invoice } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { NewInvoice } from "../interfaces/Invoice";
import { InvoiceRepository } from "../repositories/invoiceRepository";
import { UserRepository } from "../repositories/userRepository";
import { ErrorHandler } from "../utils/errorHandler";

export class InvoiceService {
  private InvoiceRepository: InvoiceRepository;

  private UserRepository: UserRepository;

  constructor() {
    this.InvoiceRepository = new InvoiceRepository;
    this.UserRepository = new UserRepository;
  }

  public async create({ userId }: NewInvoice): Promise<{ id: string; }> {
    const user = await this.UserRepository.getById(userId);

    if(!user) {
      throw new ErrorHandler(StatusCodes.NOT_FOUND, 'unregistered user');
    }

    const invoice = await this.InvoiceRepository.getByUserId(userId);

    if (invoice) {
      throw new ErrorHandler(StatusCodes.CONFLICT, 'This user already has a invoice registered');
    }

    const result = await this.InvoiceRepository.create(userId);

    return result;
  }

  public async get(): Promise<Invoice []> {
    return this.InvoiceRepository.get();
  }
}