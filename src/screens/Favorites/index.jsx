import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import workersService from 'api/services/workers';
import commonStyles from 'common/styles/common';
import { useFavorite, withFavorite } from 'common/contexts/Favorite';
import Worker from 'templates/Worker';
import Text from 'components/Text';
import Skeleton from 'components/Skeleton';
import ListFallback from 'components/ListFallback';
import { prepareWorkers } from './util';
import styles from './style';

const Favorites = () => {
  const [workers, setWorkers] = useState();
  const { setFavorites } = useFavorite();

  useEffect(() => {
    setWorkers();
    workersService
      .listFavorites()
      .then(prepareWorkers)
      .then(([preparedWorkers, favorites]) => {
        preparedWorkers;
        setWorkers(preparedWorkers);
        setFavorites(favorites);
      });
  }, [setFavorites]);

  return (
    <View style={commonStyles.flex1}>
      <Text size={1.5} weight="bold" margin={{ bottom: 3 }}>
        Profissionais favoritos
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
          ListEmptyComponent={
            <ListFallback
              icon="sad-outline"
              message="Você ainda não tem favoritos adicionados"
            />
          }
        />
      </Skeleton>
    </View>
  );
};

export default withFavorite(Favorites);
