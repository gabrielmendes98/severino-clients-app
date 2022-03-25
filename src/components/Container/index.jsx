import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';

const Container = ({ children, style }) => (
  <View style={[styles.container, style]}>{children}</View>
);

Container.propTypes = {
  children: PropTypes.any,
  style: PropTypes.object,
};

export default Container;
