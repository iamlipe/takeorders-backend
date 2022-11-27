export interface Register {
  name: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
  typeAuth: 'google' | 'apple';
  acceptedTheTerms: boolean;
}
