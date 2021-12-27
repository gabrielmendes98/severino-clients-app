import { StyleSheet } from 'react-native';
import theme from 'common/styles/theme';
import { marginHandler } from 'common/styles/util';

const createStyles = ({ margin }) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: theme.colors.white,
      borderRadius: theme.borderRadius,
      flexDirection: 'row',
      height: 45,
      paddingHorizontal: theme.spacing(2),
      ...marginHandler(margin),
    },
    input: {
      height: 45,
      marginLeft: theme.spacing(1),
    },
  });

export default createStyles;
