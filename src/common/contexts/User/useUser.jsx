import { useContext } from 'react';
import { throwError } from 'common/util/throwError';
import { UserContext } from './index';

const useUser = () => {
  const data = useContext(UserContext);
  if (!data) {
    return throwError(
      'Verifique se seu componente está envolvido em um UserProvider',
    );
  }
  return data;
};

export default useUser;
