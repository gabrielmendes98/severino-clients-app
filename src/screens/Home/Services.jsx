import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View, Image } from 'react-native';
import Text from 'components/Text';
import styles from './style';

const Services = ({ services }) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    style={styles.container}
  >
    {services.map(({ name, id, imageUrl }) => (
      <View key={id} style={styles.serviceContainer}>
        <View key={id} style={styles.card}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
        </View>
        <Text margin={{ top: 0.5 }} weight="bold">
          {name}
        </Text>
      </View>
    ))}
  </ScrollView>
);

Services.defaultProps = {
  services: [],
};

Services.propTypes = {
  services: PropTypes.array,
};

export default Services;
