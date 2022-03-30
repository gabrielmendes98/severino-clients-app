import React, { useState, useCallback } from 'react';
import { View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import professionalsService from 'api/services/professionals';
import Professional from 'templates/Professional';
import Text from 'components/Text';
import { prepareProfessionals } from './util';

const Favorites = () => {
  const [professionals, setProfessionals] = useState([]);

  useFocusEffect(
    useCallback(() => {
      professionalsService
        .listFavorites()
        .then(prepareProfessionals)
        .then(setProfessionals);
    }, []),
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

export default Favorites;
