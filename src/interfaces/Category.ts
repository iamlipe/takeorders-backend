export interface NewCategory {
  name: string;
  stockId: string;
}

export interface QueryCategory {
  stockId?: string;
}

export interface GetCategoryById {
  id: string;
}