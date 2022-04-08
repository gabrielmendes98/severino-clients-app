import { StyleSheet } from 'react-native';
import { SAFE_SPACING } from 'common/constants';
import theme from 'common/styles/theme';

const createStyles = ({ horizontalSpacing, removeBottomMargin }) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginTop: theme.spacing(SAFE_SPACING),
      paddingHorizontal: horizontalSpacing ? theme.spacing(SAFE_SPACING) : 0,
      marginBottom: removeBottomMargin ? 0 : theme.spacing(SAFE_SPACING),
    },
  });

export default createStyles;
