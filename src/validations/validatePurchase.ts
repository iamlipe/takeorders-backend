import * as yup from 'yup';
import { NewPurchase } from '../interfaces/Purchase';

const schema = yup.object().shape({
  expanse: yup.string().required(),
  description: yup.string(),
  totalPrice: yup.number().min(0).required(),
  spentId: yup.string().required(),
  createdAt: yup.date(),
  updatedAt: yup.date()
});

export const validatePurchase = async(newPurchase: NewPurchase) => {
  await schema.validate(newPurchase);
};
