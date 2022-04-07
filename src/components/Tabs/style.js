import { StyleSheet } from 'react-native';
import theme from 'common/styles/theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

const getOptionStyles = (value, selected) => {
  const isSelected = value === selected;

  return {
    borderBottomColor: isSelected ? theme.colors.primary : theme.colors.grey,
    borderBottomWidth: 2,
    flex: 1,
    paddingVertical: theme.spacing(1.5),
    paddingHorizontal: theme.spacing(1),
  };
};

export { getOptionStyles };
export default styles;
