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
  numberLocation: {},
  align: {},
  description: {},
  whiteBox: {},
});

export default styles;
