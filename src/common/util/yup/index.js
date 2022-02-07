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

export { yupResolver as resolver };
export default yup;
