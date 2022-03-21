import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import ServiceCard from 'templates/ServiceCard';
import styles from './style';

const Services = ({ services }) => (
  <View style={styles.servicesContainer}>
    {services.map(({ serviceName, serviceId, avatarUrl }) => (
      <View key={serviceId} style={styles.serviceContainer}>
        <ServiceCard name={serviceName} id={serviceId} avatarUrl={avatarUrl} />
      </View>
    ))}
  </View>
);

Services.defaultProps = {
  services: [],
};

Services.propTypes = {
  services: PropTypes.array,
};

export default memo(Services);
