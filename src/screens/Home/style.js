import { StyleSheet } from 'react-native';
import theme from 'common/styles/theme';

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius,
    height: theme.spacing(12),
    justifyContent: 'center',
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    width: theme.spacing(12),
  },
  container: {
    flexDirection: 'row',
  },
  image: {
    height: theme.spacing(10),
    width: theme.spacing(10),
  },
  serviceContainer: {
    alignItems: 'center',
    marginRight: theme.spacing(2),
  },
});

export default styles;
