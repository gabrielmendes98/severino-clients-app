import { StyleSheet } from 'react-native';
import { getColor, getContrast, marginHandler } from 'common/styles/util';
import theme from 'common/styles/theme';

const styles = ({ size = 1, color = 'primary', weight = 'normal', margin }) =>
  StyleSheet.create({
    container: {
      alignSelf: 'flex-start',
      borderRadius: theme.borderRadius,
    },
    button: {
      backgroundColor: getColor(color),
      paddingVertical: theme.spacing(1),
      paddingHorizontal: theme.spacing(1.5),
      borderRadius: theme.borderRadius,
      ...marginHandler(margin),
    },
    text: {
      alignSelf: 'center',
      color: getContrast(color),
      fontWeight: String(weight),
      fontSize: theme.fontSize(size),
    },
  });

export default styles;
