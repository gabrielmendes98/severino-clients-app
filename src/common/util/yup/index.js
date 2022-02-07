import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

yup.setLocale({
  mixed: {
    required: 'Campo obrigatório',
  },
  string: {
    email: 'E-mail inválido',
  },
});

const resolver = schema => yupResolver(yup.object(schema).required());

export { resolver };
export default yup;
