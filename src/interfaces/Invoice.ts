export interface NewInvoice {
  userId: string;
}

export interface QueryInvoice {
  userId?: string;
}

export interface GetInvoiceById {
  id: string;
}