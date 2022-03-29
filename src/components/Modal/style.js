import { StyleSheet } from 'react-native';
import theme from 'common/styles/theme';

const createStyles = ({ fullScreen, height }) => {
  const modalStyles = {};
  const containerStyles = {};

  if (!fullScreen) {
    modalStyles.justifyContent = 'flex-end';
    containerStyles.flex = 0;
    containerStyles.height = `${height}%`;
  }

  return StyleSheet.create({
    modal: {
      margin: 0,
      ...modalStyles,
    },
    container: {
      backgroundColor: theme.colors.background.main,
      flex: 1,
      ...containerStyles,
    },
  });
};

export default createStyles;
