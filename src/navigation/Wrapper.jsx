/* eslint-disable react/function-component-definition */
/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

const wrapper =
  ({ component: Component, layout: Layout = View, back }) =>
  props =>
    (
      <Layout style={styles.layout} back={back}>
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

wrapper.propTypes = {
  component: PropTypes.node.isRequired,
  layout: PropTypes.node,
  back: PropTypes.bool,
};

export default wrapper;
