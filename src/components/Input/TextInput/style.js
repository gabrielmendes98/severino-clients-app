import { StyleSheet } from 'react-native';
import theme from 'common/styles/theme';
import { marginHandler } from 'common/styles/util';

const createStyles = ({ margin }) =>
  StyleSheet.create({
    wrapper: {
      width: '100%',
      marginTop: theme.spacing(2),
    },
    container: {
      alignItems: 'center',
      backgroundColor: theme.colors.white,
      borderRadius: theme.borderRadius,
      flexDirection: 'row',
      height: 45,
      paddingHorizontal: theme.spacing(2),
      width: '100%',
      ...marginHandler(margin),
    },
    input: {
      height: 45,
      marginLeft: theme.spacing(1),
    },
  });

export default createStyles;
