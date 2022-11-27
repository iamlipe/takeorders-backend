import { string } from "yup";

export interface NewSignature {
  userId: string;
  planId: string;
}

export interface QuerySignatures {
  userId?: string;
  planId?: string;
}

export interface GetSignatureById {
  id: string;
}

export interface UpdateSignature {
  id: string;
  updateSignature: NewSignature;
}

export interface RemoveSignature {
  id: string;
}