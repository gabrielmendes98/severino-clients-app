import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import theme from 'common/styles/theme';
import styles from './style';

const starsArray = length => {
  const array = [];
  let total = length;

  for (let i = 0; i < 5; i++) {
    if (total >= 1) {
      array.push('star');
      total--;
    } else if (total < 1 && total > 0) {
      array.push('star-half');
      total--;
    } else {
      array.push('star-border');
    }
  }

  return array;
};

const Stars = ({ length, justify, onPress, size, spacing }) => (
  <View style={[styles.container, { justifyContent: justify }]}>
    {starsArray(length).map((starType, index) => (
      <MaterialIcons
        key={index}
        name={starType}
        size={size}
        color={theme.colors.primary}
        style={{ marginRight: theme.spacing(spacing) }}
        onPress={() => onPress && onPress(index)}
        testID={starType}
      />
    ))}
  </View>
);

Stars.defaultProps = {
  justify: 'flex-start',
  size: 27,
  spacing: 1,
};

Stars.propTypes = {
  length: PropTypes.number,
  justify: PropTypes.oneOf([
    'flex-start',
    'flex-end',
    'center',
    'space-between',
    'space-around',
    'space-evenly',
  ]),
  onPress: PropTypes.func,
  size: PropTypes.number,
  spacing: PropTypes.number,
};

export default Stars;
