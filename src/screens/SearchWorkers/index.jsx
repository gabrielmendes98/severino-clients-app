import React, { useCallback, useState } from 'react';
import { View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { useFocusEffect } from '@react-navigation/native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import servicesService from 'api/services/services';
import theme from 'common/styles/theme';
import commonStyles from 'common/styles/common';
import { useFavorite, withFavorite } from 'common/contexts/Favorite';
import Worker from 'templates/Worker';
import showOrderByModal from 'templates/OrderByModal/showModal';
import Button from 'components/Button';
import Text from 'components/Text';
import Skeleton from 'components/Skeleton';
import withModal from 'components/Modal/withModal';
import { orderByOptions, prepareWorkers } from './util';
import styles from './style';

const SearchWorkers = ({ route, showModal }) => {
  const [workers, setWorkers] = useState();
  const [order, setOrder] = useState();
  const { setFavorites } = useFavorite();

  const handleOrderBy = () =>
    showOrderByModal({ showModal, options: orderByOptions, setOrder, order });

  useFocusEffect(
    useCallback(() => {
      const params = { order };
      servicesService
        .searchWorkers(route.params?.serviceId, params)
        .then(prepareWorkers)
        .then(([preparedWorkers, favorites]) => {
          setWorkers(preparedWorkers);
          setFavorites(favorites);
        });
    }, [order, route.params?.serviceId, setFavorites]),
  );

  return (
    <View style={commonStyles.flex1}>
      <Text margin={{ bottom: 3 }} size={1.4} weight="bold">
        Serviço escolhido: {route.params?.serviceName}
      </Text>

      <Button
        variant="outlined"
        icon={
          <IonIcons
            name="filter-outline"
            size={20}
            color={theme.colors.primary}
          />
        }
        margin={{ bottom: 3 }}
        onPress={handleOrderBy}
      >
        Ordenar por
      </Button>

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

SearchWorkers.propTypes = {
  route: PropTypes.object,
  showModal: PropTypes.func,
};

export default withModal(withFavorite(SearchWorkers));
