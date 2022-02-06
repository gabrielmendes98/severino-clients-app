import React from 'react';
import { ScrollView, View } from 'react-native';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from 'components/Header';
import styles from './style';

const Main = ({ children, back }) => (
  <SafeAreaView style={styles.container}>
    <Header back={back} />

    <ScrollView keyboardShouldPersistTaps="handled">
      <View style={styles.main}>{children}</View>
    </ScrollView>
  </SafeAreaView>
);

Main.propTypes = {
  children: PropTypes.node.isRequired,
  back: PropTypes.bool,
};

export default Main;
