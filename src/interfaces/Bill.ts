
export interface NewBill {
  name: string;
  email?: string;
  phone?: string;
  image?: string;
  status?: boolean;
  userId: string;
}

export interface QueryBill {
  userId?: string;
  status?: '1' | '0';
}

export interface GetBillById {
  id: string;
}

export interface UpdateBill {
  id: string;
  updateBill: NewBill;
}

export interface CloseBill {
  id: string;
}

export interface RemoveBill {
  id: string;
}