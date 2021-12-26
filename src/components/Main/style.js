import { StyleSheet } from 'react-native';
import theme from 'common/styles/theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background.main,
    flex: 1,
  },
  main: {
    flex: 1,
    padding: 12,
  },
});

export default styles;
