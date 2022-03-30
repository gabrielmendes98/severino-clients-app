import React, { useState, useCallback } from 'react';
import { View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import professionalsService from 'api/services/professionals';
import { useFavorite, withFavorite } from 'common/contexts/Favorite';
import Professional from 'templates/Professional';
import Text from 'components/Text';
import { prepareProfessionals } from './util';

const Favorites = () => {
  const [professionals, setProfessionals] = useState([]);
  const { setFavorites } = useFavorite();

  useFocusEffect(
    useCallback(() => {
      professionalsService
        .listFavorites()
        .then(prepareProfessionals)
        .then(([preparedProfessionals, favorites]) => {
          setProfessionals(preparedProfessionals);
          setFavorites(favorites);
        });
    }, [setFavorites]),
  );

  return (
    <View>
      <Text size={1.5} weight="bold" margin={{ bottom: 3 }}>
        Profissionais favoritados
      </Text>

      {professionals.map(professional => (
        <Professional key={professional.id} professional={professional} />
      ))}
    </View>
  );
};

export default withFavorite(Favorites);
