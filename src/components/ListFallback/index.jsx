import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import theme from 'common/styles/theme';
import Text from 'components/Text';
import styles from './style';

const ListFallback = ({ icon, message, size }) => (
  <View style={styles.container}>
    <IonIcons
      size={theme.spacing(size * 3.5)}
      name={icon}
      color={theme.colors.grey}
    />

    <Text color="light" size={size} align="center">
      {message}
    </Text>
  </View>
);

ListFallback.defaultProps = {
  size: 2,
};

ListFallback.propTypes = {
  icon: PropTypes.node.isRequired,
  message: PropTypes.string.isRequired,
  size: PropTypes.number,
};

export default ListFallback;
