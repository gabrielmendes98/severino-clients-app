import { StyleSheet } from 'react-native';
import theme from 'common/styles/theme';
import { marginHandler } from 'common/styles/util';

const INPUT_HEIGHT = 45;

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
      height: INPUT_HEIGHT,
      paddingHorizontal: theme.spacing(2),
      width: '100%',
      ...marginHandler(margin),
    },
    input: {
      height: INPUT_HEIGHT,
      marginLeft: theme.spacing(1),
    },
  });

export { INPUT_HEIGHT };
export default createStyles;
