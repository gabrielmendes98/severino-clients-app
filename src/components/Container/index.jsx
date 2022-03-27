import React, { useMemo } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import createStyles from './style';

const Container = ({ children, style, horizontalSpacing }) => {
  const styles = useMemo(
    () => createStyles({ horizontalSpacing }),
    [horizontalSpacing],
  );

  return <View style={[styles.container, style]}>{children}</View>;
};

Container.defaultProps = {
  horizontalSpacing: true,
};

Container.propTypes = {
  children: PropTypes.any,
  style: PropTypes.object,
  horizontalSpacing: PropTypes.bool,
};

export default Container;
