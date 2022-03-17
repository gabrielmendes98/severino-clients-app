import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { SvgCssUri } from 'react-native-svg';
import theme from 'common/styles/theme';
import HorizontalScroll from 'components/Views/HorizontalScroll';
import Text from 'components/Text';
import styles from './style';

const Services = ({ services }) => (
  <HorizontalScroll>
    {services.map(({ name, id, avatarUrl }) => (
      <View key={id} style={styles.serviceContainer}>
        <Shadow
          distance={5}
          offset={[0, 1]}
          startColor={theme.colors.boxShadow.start}
        >
          <View key={id} style={styles.card}>
            <SvgCssUri height="100%" uri={avatarUrl} width="100%" />
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

export default memo(Services);
