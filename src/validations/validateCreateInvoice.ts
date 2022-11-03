import * as yup from 'yup';
import { NewInvoice } from '../interfaces/Invoice';

const schema = yup.object().shape({
  userId: yup.string().required(),
});

export const validateCreateInvoice = async({ userId }: NewInvoice) => {
  await schema.validate({ userId });
};
