import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { passwordValidate } from './passwordValidate';

const validationMessages = {
  mixed: {
    required: 'Campo obrigatório',
  },
  string: {
    email: 'E-mail inválido',
  },
};

yup.setLocale(validationMessages);

const resolver = schema => schema && yupResolver(yup.object(schema).required());

yup.addMethod(yup.string, 'password', passwordValidate);

export { resolver, validationMessages };
export default yup;
