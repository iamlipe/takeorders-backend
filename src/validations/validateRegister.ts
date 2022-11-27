import * as yup from 'yup';
import { Register } from '../interfaces/Register';

const schema = yup.object().shape({
  name: yup.string().required().min(3),
  email: yup.string().email().required(),
  phone: yup.string().length(11),
  password: yup.string().required(),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
  typeAuth: yup.string().matches(/(google|apple)/),
  acceptedTheTerms: yup.boolean().required(),
});

export const validateRegister = async(register: Register) => {
  await schema.validate(register);
};

