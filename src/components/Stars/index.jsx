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

const Stars = ({ length, justify, onPress }) => (
  <View style={[styles.container, { justifyContent: justify }]}>
    {starsArray(length).map((starType, index) => (
      <MaterialIcons
        key={index}
        name={starType}
        size={27}
        color={theme.colors.primary}
        style={styles.star}
        onPress={() => onPress && onPress(index)}
      />
    ))}
  </View>
);

Stars.defaultProps = {
  justify: 'flex-start',
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
};

export default Stars;
