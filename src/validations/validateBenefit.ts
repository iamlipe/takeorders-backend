import * as yup from 'yup';
import { NewBenefit } from '../interfaces/Benefit';

const schema = yup.object().shape({
  name: yup.string().min(3).required(),
  description: yup.string(),
  planId: yup.string().required(),
});

export const validateBenefit = async(newBenefit: NewBenefit) => {
  await schema.validate(newBenefit);
};
