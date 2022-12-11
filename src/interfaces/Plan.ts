export interface NewPlan {
  name: string;
  price: number;
}

export interface GetPlanById {
  id: string;
}

export interface GetPlanByName {
  name: string;
}

export interface UpdatePlan {
  id: string;
  updatePlan: NewPlan;
}

export interface RemovePlan {
  id: string;
}
