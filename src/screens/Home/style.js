import { StyleSheet } from 'react-native';
import theme from 'common/styles/theme';

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius,
    height: theme.spacing(12),
    justifyContent: 'center',
    width: theme.spacing(12),
  },
  image: {
    height: theme.spacing(10),
    width: theme.spacing(10),
  },
  serviceContainer: {
    alignItems: 'center',
    marginRight: theme.spacing(2),
    paddingTop: theme.spacing(1),
  },
});

export default styles;
