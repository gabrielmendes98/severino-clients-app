import { useContext } from 'react';
import { LocationContext } from './index';

const useLocation = () => {
  const data = useContext(LocationContext);
  if (!data) {
    throw new Error(
      'Verifique se seu componente está envolvido em um LocationProvider',
    );
  }
  return data;
};

export default useLocation;
