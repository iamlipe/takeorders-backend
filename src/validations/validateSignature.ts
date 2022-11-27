import * as yup from 'yup';
import { NewSignature } from '../interfaces/Signature';

const schema = yup.object().shape({
  planId: yup.string().required(),
  userId: yup.string().required(),
});

export const validateSignature = async(newSignature: NewSignature) => {
  await schema.validate(newSignature);
};
