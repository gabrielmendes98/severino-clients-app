import React, { useState, useCallback } from 'react';
import { View, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import professionalsService from 'api/services/professionals';
import commonStyles from 'common/styles/common';
import { useFavorite, withFavorite } from 'common/contexts/Favorite';
import Professional from 'templates/Professional';
import Text from 'components/Text';
import Skeleton from 'components/Skeleton';
import { prepareProfessionals } from './util';
import styles from './style';

const Favorites = () => {
  const [professionals, setProfessionals] = useState();
  const { setFavorites } = useFavorite();

  useFocusEffect(
    useCallback(() => {
      setProfessionals();
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
    <View style={commonStyles.flex1}>
      <Text size={1.5} weight="bold" margin={{ bottom: 3 }}>
        Profissionais favoritados
      </Text>

      <Skeleton
        ready={Boolean(professionals)}
        itemsStyle={styles.skeletonItem}
        height={16}
        length={4}
        direction="column"
      >
        <FlatList
          data={professionals}
          renderItem={({ item: professional }) => (
            <Professional professional={professional} />
          )}
          keyExtractor={item => item.id}
        />
      </Skeleton>
    </View>
  );
};

export default withFavorite(Favorites);
