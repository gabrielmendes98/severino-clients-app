import React from 'react';
import { ScrollView, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from 'common/styles/theme';
import Header from 'templates/Header';
import Container from 'components/Container';
import styles from './style';

const Main = ({ children, back, removeScrollView }) => (
  <SafeAreaView style={styles.container}>
    <StatusBar
      barStyle="dark-content"
      backgroundColor={theme.colors.background.main}
    />

    <Header back={back} />

    {removeScrollView ? (
      <Container removeBottomMargin>{children}</Container>
    ) : (
      <ScrollView keyboardShouldPersistTaps="handled" testID="main-scroll-view">
        <Container>{children}</Container>
      </ScrollView>
    )}
  </SafeAreaView>
);

Main.propTypes = {
  children: PropTypes.node.isRequired,
  back: PropTypes.bool,
  removeScrollView: PropTypes.bool,
};

export default Main;
