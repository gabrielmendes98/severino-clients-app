import { StyleSheet } from 'react-native';
import theme from 'common/styles/theme';
import { SAFE_SPACING } from 'common/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  review: {
    paddingVertical: theme.spacing(1.5),
  },
  reviews: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(-SAFE_SPACING),
  },
  skeletonItem: {
    width: '100%',
  },
});

export default styles;
