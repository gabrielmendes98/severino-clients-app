import { StyleSheet } from 'react-native';
import theme from 'common/styles/theme';

const styles = StyleSheet.create({
  actions: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  avatar: {
    borderRadius: theme.spacing(12) / 2,
    height: theme.spacing(12),
    width: theme.spacing(12),
    zIndex: 1,
  },
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius,
    marginTop: theme.spacing(-9),
    padding: theme.spacing(1),
    paddingTop: theme.spacing(9),
    width: '100%',
  },
  container: {
    alignItems: 'center',
    marginRight: theme.spacing(2.5),
    width: theme.spacing(25),
  },
  evaluation: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: theme.spacing(1),
  },
});

export default styles;
