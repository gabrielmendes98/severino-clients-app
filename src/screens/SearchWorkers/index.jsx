import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { useFocusEffect } from '@react-navigation/native';
import servicesService from 'api/services/services';
import Professional from 'templates/Professional';
import Text from 'components/Text';
import { prepareProfessionals } from './util';

const SearchWorkers = ({ route }) => {
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

      {workers.map(worker => (
        <Professional key={worker.id} professional={worker} />
      ))}
    </View>
  );
};

SearchWorkers.propTypes = {
  route: PropTypes.object,
};

export default SearchWorkers;
