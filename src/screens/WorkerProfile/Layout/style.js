import { StyleSheet } from 'react-native';
import theme from 'common/styles/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 60,
    paddingHorizontal: theme.spacing(2),
    backgroundColor: theme.colors.primary,
  },
});

export default styles;
