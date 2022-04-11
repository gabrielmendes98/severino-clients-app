import { StyleSheet } from 'react-native';
import theme from 'common/styles/theme';

const styles = StyleSheet.create({
  review: {
    paddingVertical: theme.spacing(1.5),
  },
  reviews: {
    marginTop: theme.spacing(2),
  },
  skeletonItem: {
    width: '100%',
  },
});

export default styles;
