import React, { useMemo } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import createStyles from './style';

const Container = ({
  children,
  style,
  horizontalSpacing,
  removeBottomMargin,
}) => {
  const styles = useMemo(
    () => createStyles({ horizontalSpacing, removeBottomMargin }),
    [horizontalSpacing, removeBottomMargin],
  );

  return <View style={[styles.container, style]}>{children}</View>;
};

Container.defaultProps = {
  horizontalSpacing: true,
  removeBottomMargin: false,
};

Container.propTypes = {
  children: PropTypes.any,
  style: PropTypes.object,
  horizontalSpacing: PropTypes.bool,
  removeBottomMargin: PropTypes.bool,
};

export default Container;
