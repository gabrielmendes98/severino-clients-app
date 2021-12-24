import { StyleSheet } from 'react-native';
import { getColor, getContrast, marginHandler } from 'common/styles/util';
import { BUTTON_TYPES } from './constants';
import theme from 'common/styles/theme';

const { OUTLINED, CONTAINED } = BUTTON_TYPES;

const styles = ({
  size = 1,
  color = 'primary',
  weight = 'normal',
  margin,
  variant = 'contained',
}) => {
  const buttonStyles = {};
  const textStyles = {};

  if (variant === CONTAINED) {
    buttonStyles.backgroundColor = getColor(color);
    textStyles.color = getContrast(color);
  } else {
    buttonStyles.backgroundColor = 'transparent';
    textStyles.color = getColor(color);
  }

  if (variant === OUTLINED) {
    buttonStyles.borderColor = theme.palette.common.border;
    buttonStyles.borderWidth = theme.borderWidth;
  }

  return StyleSheet.create({
    container: {
      alignSelf: 'flex-start',
      borderRadius: theme.borderRadius,
    },
    button: {
      ...buttonStyles,
      paddingVertical: theme.spacing(1),
      paddingHorizontal: theme.spacing(2),
      borderRadius: theme.borderRadius,
      ...marginHandler(margin),
    },
    text: {
      ...textStyles,
      alignSelf: 'center',
      fontWeight: String(weight),
      fontSize: theme.fontSize(size),
    },
  });
};

export default styles;
