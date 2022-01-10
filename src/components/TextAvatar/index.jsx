import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Text from 'components/Text';
import createStyles from './style';

const TextAvatar = ({ text, size }) => {
  const styles = useMemo(() => createStyles({ size }), [size]);
  const textArray = text.split(' ');
  const avatar =
    textArray.length >= 2 ? textArray[0][0] + textArray[1][0] : textArray[0][0];

  return (
    <View style={styles.container}>
      <Text color="white" size={size / 4}>
        {avatar.toUpperCase()}
      </Text>
    </View>
  );
};

TextAvatar.defaultProps = {
  size: 12,
  text: '',
};

TextAvatar.propTypes = {
  size: PropTypes.number,
  text: PropTypes.string.isRequired,
};

export default TextAvatar;
