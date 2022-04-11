import { StyleSheet } from 'react-native';
import theme from 'common/styles/theme';

const styles = StyleSheet.create({
  actions: {
    alignItems: 'center',
    // alignSelf: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // width: '100%',
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
    marginVertical: theme.spacing(1),
  },
});

export default styles;
