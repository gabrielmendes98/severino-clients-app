import { StyleSheet } from 'react-native';
import theme from 'common/styles/theme';
import { SAFE_SPACING } from 'common/constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background.main,
    flex: 1,
  },
  main: {
    flex: 1,
    marginVertical: theme.spacing(SAFE_SPACING),
    paddingHorizontal: theme.spacing(SAFE_SPACING),
  },
});

export default styles;
