import { StyleSheet } from 'react-native';
import { SAFE_SPACING } from 'common/constants';
import theme from 'common/styles/theme';

const createStyles = ({ horizontalSpacing }) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginVertical: theme.spacing(SAFE_SPACING),
      paddingHorizontal: horizontalSpacing ? theme.spacing(SAFE_SPACING) : 0,
    },
  });

export default createStyles;
