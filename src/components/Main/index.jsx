import React from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from 'components/Header';
import styles from './style';

const Main = ({ children }) => (
  <SafeAreaView style={styles.container}>
    <Header />

    {children}
  </SafeAreaView>
);

Main.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Main;
