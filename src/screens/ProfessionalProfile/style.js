import { StyleSheet } from 'react-native';
import theme from 'common/styles/theme';
import { SAFE_SPACING } from 'common/constants';

const styles = StyleSheet.create({
  header: {
    marginHorizontal: theme.spacing(-SAFE_SPACING),
    marginTop: theme.spacing(-SAFE_SPACING),
    paddingTop: theme.spacing(SAFE_SPACING),
    alignItems: 'center',
    marginBottom: theme.spacing(4),
  },
  box: {
    position: 'absolute',
    backgroundColor: theme.colors.primary,
    width: '100%',
    height: theme.spacing(8),
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingVertical: theme.spacing(1),
    paddingHorizontal: theme.spacing(2),
  },
  avatar: {
    borderRadius: theme.spacing(12) / 2,
    height: theme.spacing(12),
    width: theme.spacing(12),
    zIndex: 1,
  },
  numberLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: theme.spacing(2.5),
    marginBottom: theme.spacing(3),
  },
  align: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  description: {
    marginTop: theme.spacing(2),
    borderLeftWidth: theme.spacing(0.5),
    borderLeftColor: theme.colors.primary,
    paddingLeft: theme.spacing(1),
  },
  whiteBox: {},
});

export default styles;
