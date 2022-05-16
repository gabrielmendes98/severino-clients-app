import { useContext } from 'react';
import { throwError } from 'common/util/throwError';
import { FormContext } from './context';

const useForm = () => {
  const data = useContext(FormContext);
  if (!data) {
    return throwError('Verifique se seu componente está dentro de um Form');
  }
  return data;
};

export default useForm;
