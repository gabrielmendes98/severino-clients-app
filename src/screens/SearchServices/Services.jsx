import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import ServiceCard from 'templates/ServiceCard';
import ListFallback from 'components/ListFallback';
import List from 'components/List';
import styles from './style';

const Services = ({ services }) => (
  <View style={styles.servicesContainer}>
    {console.log(services)}
    <List
      data={services}
      keyExtractor={item => item.serviceId}
      renderItem={({ item: { serviceName, serviceId, avatarUrl } }) => (
        <View style={styles.serviceContainer}>
          <ServiceCard
            name={serviceName}
            id={serviceId}
            avatarUrl={avatarUrl}
          />
        </View>
      )}
      ListEmptyComponent={
        Boolean(services) && (
          <ListFallback
            icon="close-circle-outline"
            message="Não encontramos serviços com esse nome"
          />
        )
      }
    />
  </View>
);

Services.propTypes = {
  services: PropTypes.array,
};

export default memo(Services);
