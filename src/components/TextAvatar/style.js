import { StyleSheet } from 'react-native';
import theme from 'common/styles/theme';

const createStyles = ({ size }) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: theme.colors.primary,
      borderRadius: theme.spacing(size) / 2,
      height: theme.spacing(size),
      justifyContent: 'center',
      width: theme.spacing(size),
      zIndex: 1,
    },
  });

export default createStyles;
