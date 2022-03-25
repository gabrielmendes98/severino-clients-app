import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View } from 'react-native';
import styles from './style';

const HorizontalScroll = ({ children }) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    style={styles.scrollView}
  >
    <View style={styles.view}>{children}</View>
  </ScrollView>
);

HorizontalScroll.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HorizontalScroll;
