import { useContext } from 'react';
import { throwError } from 'common/util/throwError';
import { LocationContext } from './index';

const useLocation = () => {
  const data = useContext(LocationContext);
  if (!data) {
    return throwError(
      'Verifique se seu componente está envolvido em um LocationProvider',
    );
  }
  return data;
};

export default useLocation;
