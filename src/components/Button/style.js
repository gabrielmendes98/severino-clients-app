import { StyleSheet } from 'react-native';
import { getColor, getContrast, marginHandler } from 'common/styles/util';
import theme from 'common/styles/theme';
import { BUTTON_TYPES } from './constants';

const { OUTLINED, CONTAINED } = BUTTON_TYPES;

const styles = ({
  size = 1,
  color = 'primary',
  fullWidth = false,
  weight = 'normal',
  margin,
  variant = 'contained',
  textAlign = 'center',
}) => {
  const buttonStyles = {};
  const textStyles = {};
  let width;

  if (variant === CONTAINED) {
    buttonStyles.backgroundColor = getColor(color);
    textStyles.color = getContrast(color);
  } else {
    buttonStyles.backgroundColor = 'transparent';
    textStyles.color = getColor(color);
  }

  if (variant === OUTLINED) {
    buttonStyles.borderColor = theme.colors.border;
    buttonStyles.borderWidth = theme.borderWidth;
  }

  if (fullWidth) {
    width = '100%';
  }

  return StyleSheet.create({
    container: {
      borderRadius: theme.borderRadius,
      width,
      ...marginHandler(margin),
    },
    button: {
      ...buttonStyles,
      borderRadius: theme.borderRadius,
      paddingHorizontal: theme.spacing(2),
      paddingVertical: theme.spacing(1),
      width,
      flexDirection: 'row',
    },
    text: {
      ...textStyles,
      alignSelf: 'center',
      fontSize: theme.fontSize(size),
      fontWeight: String(weight),
      flex: 1,
      textAlign,
    },
    icon: {
      marginRight: theme.spacing(2),
    },
  });
};

export default styles;
