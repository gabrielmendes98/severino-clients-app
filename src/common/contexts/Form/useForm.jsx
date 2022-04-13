import { useContext } from 'react';
import { FormContext } from './context';

const useForm = () => {
  const data = useContext(FormContext);
  if (!data) {
    throw new Error('Verifique se seu componente está dentro de um Form');
  }
  return data;
};

export default useForm;
