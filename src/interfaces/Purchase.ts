export interface NewPurchase {
  expanse: string;
  description?: string;
  totalPrice: number;
  createdAt?: Date;
  updatedAt?: Date;
  spentId: string;
}

export interface QueryPurchase {
  spentId?: string;
}

export interface GetPurchaseById {
  id: string;
}

export interface UpdatePurchase {
  id: string;
  updatePurchase: NewPurchase;
}

export interface RemovePurchase {
  id: string;
}