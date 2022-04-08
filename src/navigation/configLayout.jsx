/* eslint-disable react/function-component-definition */
/* eslint-disable react/display-name */
import React from 'react';
import { View, StyleSheet } from 'react-native';

const configLayout =
  (Component, Layout = View, layoutProps) =>
  props =>
    (
      <Layout style={styles.layout} {...layoutProps}>
        <Component {...props} />
      </Layout>
    );

const styles = StyleSheet.create({
  layout: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default configLayout;
