import * as yup from 'yup';
import { NewPlan } from '../interfaces/Plan';

const schema = yup.object().shape({
  name: yup.string().required(),
  price: yup.number().required(),
});

export const validatePlan = async(newPlan: NewPlan) => {
  await schema.validate(newPlan);
};
