import { useContext } from 'react';
import { FavoriteContext } from './Provider';

const useFavorite = () => {
  const data = useContext(FavoriteContext);

  if (!data) {
    throw new Error(
      'Verifique se seu componente está envolvido em um FavoriteProvider',
    );
  }

  return data;
};

export default useFavorite;
