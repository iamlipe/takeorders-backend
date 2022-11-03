export interface NewOrder {
  quantity: number;
  productId: string;
  billId: string;
}

export interface UpdateOrder {
  id: string;
  updateOrder: {
    quantity: number;
    productId: string;
    billId: string;
    createdAt: Date;
  }
}

export interface RemoveOrder {
  id: string;
}
