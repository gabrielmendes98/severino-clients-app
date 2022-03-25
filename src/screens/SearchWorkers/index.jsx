import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { useFocusEffect } from '@react-navigation/native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import servicesService from 'api/services/services';
import theme from 'common/styles/theme';
import Professional from 'templates/Professional';
import Button from 'components/Button';
import Text from 'components/Text';
import withModal from 'components/Modal/withModal';
import { prepareProfessionals } from './util';

const SearchWorkers = ({ route, showModal }) => {
  const [workers, setWorkers] = useState([]);

  useFocusEffect(
    useCallback(() => {
      servicesService
        .searchWorkers(route.params?.serviceId)
        .then(prepareProfessionals)
        .then(setWorkers);
    }, [route.params?.serviceId]),
  );

  return (
    <View>
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
        onPress={() => console.log('filter')}
      >
        Ordenar por
      </Button>

      {workers.map(worker => (
        <Professional key={worker.id} professional={worker} />
      ))}
    </View>
  );
};

SearchWorkers.propTypes = {
  route: PropTypes.object,
};

export default withModal(SearchWorkers);
