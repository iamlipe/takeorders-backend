import * as yup from 'yup';
import { NewSale } from '../interfaces/Sale';

const schema = yup.object().shape({
  name: yup.string().required(),
  totalPrice: yup.number().min(0).required(),
  invoiceId: yup.string().required(),
  createdAt: yup.date(),
  updatedAt: yup.date()
});

export const validateSale = async(newSale: NewSale) => {
  await schema.validate(newSale);
};
