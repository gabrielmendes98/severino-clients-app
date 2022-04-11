import { StyleSheet } from 'react-native';
import theme from 'common/styles/theme';

const styles = StyleSheet.create({
  actions: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
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
    flex: 1,
    marginLeft: theme.spacing(-7),
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(9),
    width: '100%',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginBottom: theme.spacing(2.5),
  },
  evaluation: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: theme.spacing(1),
  },
});

export default styles;
