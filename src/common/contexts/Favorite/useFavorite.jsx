import { useContext } from 'react';
import { throwError } from 'common/util/throwError';
import { FavoriteContext } from './Provider';

const useFavorite = () => {
  const data = useContext(FavoriteContext);

  if (!data) {
    return throwError(
      'Verifique se seu componente está envolvido em um FavoriteProvider',
    );
  }

  return data;
};

export default useFavorite;
