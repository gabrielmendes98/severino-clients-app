import React from 'react';
import { ScrollView, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from 'common/styles/theme';
import Container from 'components/Container';
import Header from 'components/Header';
import styles from './style';

const Main = ({ children, back, removeScrollView }) => (
  <SafeAreaView style={styles.container}>
    <StatusBar
      barStyle="dark-content"
      backgroundColor={theme.colors.background.main}
    />

    <Header back={back} />

    {removeScrollView ? (
      <Container>{children}</Container>
    ) : (
      <ScrollView keyboardShouldPersistTaps="handled">
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
