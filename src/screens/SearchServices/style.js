import { StyleSheet } from 'react-native';
import theme from 'common/styles/theme';

const styles = StyleSheet.create({
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  serviceContainer: {
    marginBottom: theme.spacing(3),
  },
});

export default styles;
