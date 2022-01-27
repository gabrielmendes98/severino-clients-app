import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableHighlight, Text } from 'react-native';
import { BUTTON_TYPES } from './constants';
import styles from './style';

const { CONTAINED, OUTLINED, TEXT } = BUTTON_TYPES;

const Button = ({
  color,
  children,
  style,
  size,
  weight,
  margin,
  onPress,
  variant,
  fullWidth,
  ...props
}) => {
  const customStyle = useMemo(
    () => styles({ size, color, weight, margin, variant, fullWidth }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [color, size, weight, variant, fullWidth],
  );

  return (
    <TouchableHighlight
      onPress={onPress}
      style={customStyle.container}
      {...props}
    >
      <View style={[customStyle.button, style]}>
        <Text style={customStyle.text}>{children}</Text>
      </View>
    </TouchableHighlight>
  );
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  color: PropTypes.string,
  fullWidth: PropTypes.bool,
  margin: PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
  }),
  onPress: PropTypes.func,
  size: PropTypes.number,
  style: PropTypes.object,
  variant: PropTypes.oneOf([CONTAINED, OUTLINED, TEXT]),
  weight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Button;