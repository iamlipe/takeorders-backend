export interface NewUser {
  name: string;
  email: string;
  phone?: string;
  password: string;
  typeAuth: 'google' | 'apple' | null;
  acceptedTheTerms: boolean;
}

export interface Subscription {
  userId: string;
  planId: string;
}