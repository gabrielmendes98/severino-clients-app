import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from 'common/styles/theme';
import Logo from 'components/Icons/Logo';

const Main = ({ children }) => (
  <SafeAreaView style={styles.container}>
    <View style={styles.header}>
      <Logo />
      <View style={styles.location}>
        <Text>Location</Text>
      </View>
    </View>

    {children}
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.palette.background.main,
    flex: 1,
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#00FF00',
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing(2),
  },
  location: {
    alignItems: 'center',
    backgroundColor: '#FF0000',
    height: '100%',
    justifyContent: 'center',
  },
});

Main.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Main;
