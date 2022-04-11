import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { passwordValidate } from './passwordValidate';

yup.setLocale({
  mixed: {
    required: 'Campo obrigatório',
  },
  string: {
    email: 'E-mail inválido',
  },
});

const resolver = schema => schema && yupResolver(yup.object(schema).required());

yup.addMethod(yup.string, 'password', passwordValidate);

export { resolver };
export default yup;
