export interface NewBenefit {
  name: string;
  description: string;
  planId: string;
}

export interface QueryBenefits {
  planId?: string;
}

export interface GetBenefitById {
  id: string;
}

export interface UpdateBenefit {
  id: string;
  updateBenefit: NewBenefit;
}

export interface RemoveBenefit {
  id: string;
}