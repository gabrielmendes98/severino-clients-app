import { StyleSheet } from 'react-native';
import theme from 'common/styles/theme';

const createStyles = ({ fullScreen, height }) => {
  const containerStyles = {};
  const contentStyles = {};

  if (!fullScreen) {
    containerStyles.justifyContent = 'flex-end';
    contentStyles.flex = 0;
    contentStyles.height = `${height}%`;
  }

  return StyleSheet.create({
    container: {
      margin: 0,
      ...containerStyles,
    },
    content: {
      backgroundColor: theme.colors.background.main,
      flex: 1,
      ...contentStyles,
    },
  });
};

export default createStyles;
