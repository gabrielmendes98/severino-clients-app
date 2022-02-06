import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Text as RNText } from 'react-native';
import styles from './style';

const Text = ({ children, style, size, color, weight, margin, ...props }) => {
  const customStyle = useMemo(
    () => styles({ size, color, weight, margin }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [color, size, weight],
  );

  return (
    <RNText style={[customStyle.text, style]} {...props}>
      {children}
    </RNText>
  );
};

Text.propTypes = {
  children: PropTypes.any.isRequired,
  color: PropTypes.string,
  margin: PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
  }),
  size: PropTypes.number,
  style: PropTypes.object,
  weight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Text;
