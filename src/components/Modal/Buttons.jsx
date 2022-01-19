import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Button from 'components/Button';

const Buttons = ({ actions, handleClose }) => (
  <View>
    {actions.map(({ onClick, skipClose, label, ...btnProps }) => (
      <Button
        key={label}
        onPress={() => {
          if (onClick) onClick(handleClose);
          if (!skipClose) handleClose();
        }}
        {...btnProps}
      >
        {label}
      </Button>
    ))}
  </View>
);

Buttons.propTypes = {
  actions: PropTypes.array.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default Buttons;
