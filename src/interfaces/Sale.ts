export interface NewSale {
  name: string;
  totalPrice: number;
  invoiceId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface QuerySale {
  invoiceId?: string;
}

export interface GetSaleById {
  id: string;
}

export interface UpdateSale {
  id: string;
  updateSale: NewSale;
}

export interface RemoveSale {
  id: string;
}