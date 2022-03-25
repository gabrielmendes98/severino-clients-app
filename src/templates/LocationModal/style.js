import { StyleSheet } from 'react-native';
import theme from 'common/styles/theme';
import { SAFE_SPACING } from 'common/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: theme.spacing(SAFE_SPACING),
  },
  wrapper: {
    paddingHorizontal: theme.spacing(SAFE_SPACING),
  },
  inputContainer: {
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius,
    flexDirection: 'row',
    height: 45,
    paddingHorizontal: theme.spacing(2),
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  input: {
    height: 45,
    marginLeft: theme.spacing(1),
  },
  listItem: {
    paddingVertical: theme.spacing(1),
    paddingHorizontal: theme.spacing(SAFE_SPACING),
  },
});

const selectedItemStyle = (selected, item) => ({
  backgroundColor: selected?.id === item.id ? theme.colors.primary : null,
  color:
    selected?.id === item.id
      ? theme.colors.white
      : theme.typography.colors.main,
});

const selectedItemTextColor = (selected, item) =>
  selected?.id === item.id ? 'white' : null;

export { selectedItemStyle, selectedItemTextColor };
export default styles;
