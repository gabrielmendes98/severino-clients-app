import { StyleSheet } from 'react-native';
import { getTextColor, marginHandler } from 'common/styles/util';
import theme from 'common/styles/theme';

const styles = ({
  size = 1,
  color = 'main',
  weight = 'normal',
  margin,
  align,
}) =>
  StyleSheet.create({
    text: {
      color: getTextColor(color),
      fontSize: theme.fontSize(size),
      fontWeight: String(weight),
      textAlign: align,
      ...marginHandler(margin),
    },
  });

export default styles;
