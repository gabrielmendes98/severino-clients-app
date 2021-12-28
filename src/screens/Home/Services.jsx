import React from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import theme from 'common/styles/theme';
import HorizontalScroll from 'components/Views/HorizontalScroll';
import Text from 'components/Text';
import styles from './style';

const Services = ({ services }) => (
  <HorizontalScroll>
    {services.map(({ name, id, imageUrl }) => (
      <View key={id} style={styles.serviceContainer}>
        <Shadow
          distance={5}
          offset={[0, 1]}
          startColor={theme.colors.boxShadow.start}
        >
          <View key={id} style={styles.card}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
          </View>
        </Shadow>
        <Text margin={{ top: 0.5 }} weight="bold">
          {name}
        </Text>
      </View>
    ))}
  </HorizontalScroll>
);

Services.defaultProps = {
  services: [],
};

Services.propTypes = {
  services: PropTypes.array,
};

export default Services;
