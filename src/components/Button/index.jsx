import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableHighlight, Text } from 'react-native';
import theme from 'common/styles/theme';
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
  icon,
  textAlign,
  align,
  testID,
  ...props
}) => {
  const customStyle = useMemo(
    () =>
      styles({
        size,
        color,
        weight,
        margin,
        variant,
        fullWidth,
        textAlign,
        align,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [color, size, weight, variant, fullWidth],
  );

  return (
    <TouchableHighlight
      onPress={onPress}
      style={customStyle.container}
      underlayColor={
        variant === OUTLINED ? theme.colors.beige : theme.colors.black
      }
      testID={testID}
      {...props}
    >
      <View style={[customStyle.button, style]} testID={`${testID}-view`}>
        {Boolean(icon) && <View style={customStyle.icon}>{icon}</View>}
        <Text style={customStyle.text} testID={`${testID}-text`}>
          {children}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

Button.defaultProps = {
  size: 1,
  color: 'primary',
  fullWidth: false,
  weight: 'normal',
  margin: {},
  variant: 'contained',
  textAlign: 'center',
  align: 'flex-start',
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
  icon: PropTypes.node,
  textAlign: PropTypes.oneOf(['auto', 'left', 'right', 'center', 'justify']),
  align: PropTypes.oneOf([
    'auto',
    'flex-start',
    'flex-end',
    'center',
    'stretch',
    'baseline',
  ]),
  testID: PropTypes.string,
};

export default Button;
