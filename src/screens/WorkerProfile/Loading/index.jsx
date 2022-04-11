import React from 'react';
import SkeletonContent from 'react-native-skeleton-content';
import theme from 'common/styles/theme';
import profileStyles from '../style';
import styles from './style';

const Loading = () => (
  <SkeletonContent
    containerStyle={styles.container}
    isLoading
    layout={[
      { ...profileStyles.avatar, ...styles.avatar },
      { width: 200, height: 30, marginTop: 30, alignSelf: 'center' },
      { width: 240, height: 30, marginTop: 10, alignSelf: 'center' },
      {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        children: [
          { width: 150, height: 30, marginTop: 30 },
          { width: 150, height: 30, marginTop: 30 },
        ],
      },
      { width: 240, height: 30, marginTop: 60, alignSelf: 'center' },
      { width: '100%', height: 80, marginTop: 40 },
      { width: '80%', height: 30, marginTop: 60 },
      { width: '60%', height: 30, marginTop: 10 },
      { width: '80%', height: 30, marginTop: 10 },
      { width: '60%', height: 30, marginTop: 10 },
      { width: '80%', height: 30, marginTop: 10 },
      { width: '60%', height: 30, marginTop: 10 },
    ]}
    boneColor={theme.colors.lightGrey}
    highlightColor={theme.colors.background.main}
  />
);

export default Loading;
