import React from 'react';
import PropTypes from 'prop-types';
import { View, Button } from 'react-native';

const Buttons = ({ actions, handleClose }) => (
  <View>
    {actions.map(({ onClick, skipClose, label, color, ...btnProps }) => (
      <Button
        color={color}
        key={label}
        onPress={() => {
          if (onClick) onClick(handleClose);
          if (!skipClose) handleClose();
        }}
        title={label}
        {...btnProps}
      />
    ))}
  </View>
);

Buttons.propTypes = {
  actions: PropTypes.array.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default Buttons;
