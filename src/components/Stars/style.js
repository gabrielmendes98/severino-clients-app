import { StyleSheet } from 'react-native';
import theme from 'common/styles/theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  star: {
    marginRight: theme.spacing(1),
  },
});

export default styles;
