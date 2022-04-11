import React, { useState, useCallback } from 'react';
import { View, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import workersService from 'api/services/workers';
import commonStyles from 'common/styles/common';
import { useFavorite, withFavorite } from 'common/contexts/Favorite';
import Worker from 'templates/Worker';
import Text from 'components/Text';
import Skeleton from 'components/Skeleton';
import { prepareWorkers } from './util';
import styles from './style';

const Favorites = () => {
  const [workers, setWorkers] = useState();
  const { setFavorites } = useFavorite();

  useFocusEffect(
    useCallback(() => {
      setWorkers();
      workersService
        .listFavorites()
        .then(prepareWorkers)
        .then(([preparedWorkers, favorites]) => {
          setWorkers(preparedWorkers);
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
        ready={Boolean(workers)}
        itemsStyle={styles.skeletonItem}
        height={16}
        length={4}
        direction="column"
      >
        <FlatList
          data={workers}
          renderItem={({ item: worker }) => <Worker worker={worker} />}
          keyExtractor={item => item.id}
        />
      </Skeleton>
    </View>
  );
};

export default withFavorite(Favorites);
