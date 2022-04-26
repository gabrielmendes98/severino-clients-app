import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import theme from 'common/styles/theme';
import Text from 'components/Text';
import styles from './style';

const ListFallback = ({ icon, message, size, testID }) => (
  <View style={styles.container}>
    <IonIcons
      size={theme.spacing(size * 3.5)}
      name={icon}
      color={theme.colors.grey}
      testID={`${testID}-icon`}
    />

    <Text color="light" size={size} align="center" testID={`${testID}-message`}>
      {message}
    </Text>
  </View>
);

ListFallback.defaultProps = {
  size: 2,
};

ListFallback.propTypes = {
  icon: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  size: PropTypes.number,
  testID: PropTypes.string,
};

export default ListFallback;
