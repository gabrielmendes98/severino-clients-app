import { StyleSheet } from 'react-native';
import { SAFE_SPACING } from 'common/constants';
import theme from 'common/styles/theme';

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: theme.spacing(-SAFE_SPACING),
  },
  view: {
    flexDirection: 'row',
    marginLeft: theme.spacing(SAFE_SPACING),
  },
});

export default styles;
