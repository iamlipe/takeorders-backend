import { Invoice } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
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

  public async create(userId: string): Promise<{ id: string; }> {
    const user = await this.UserRepository.getById(userId);

    if(!user) {
      throw new ErrorHandler(StatusCodes.NOT_FOUND, 'unregistered user');
    }

    const result = await this.InvoiceRepository.create(userId);

    return result;
  }

  public async get(): Promise<Invoice []> {
    return this.InvoiceRepository.get();
  }
}