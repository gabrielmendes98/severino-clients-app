import { StyleSheet } from 'react-native';
import { SAFE_SPACING } from 'common/constants';
import theme from 'common/styles/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: theme.spacing(SAFE_SPACING),
    paddingHorizontal: theme.spacing(SAFE_SPACING),
  },
});

export default styles;
