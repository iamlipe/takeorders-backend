import * as yup from 'yup';
import { Login } from '../interfaces/Login';

const schema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required()
});

export const validateLogin = async (login: Login) => {
  await schema.validate(login);
};
