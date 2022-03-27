import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { SAFE_SPACING } from 'common/constants';
import theme from 'common/styles/theme';
import Button from 'components/Button';

const Buttons = ({ actions, handleClose }) => (
  <View style={styles.container}>
    {actions.map(
      ({ onPress, skipClose, label, fullWidth = true, ...btnProps }) => (
        <Button
          key={label}
          onPress={() => {
            if (onPress) onPress(handleClose);
            if (!skipClose) handleClose();
          }}
          fullWidth={fullWidth}
          margin={{ top: 2 }}
          {...btnProps}
        >
          {label}
        </Button>
      ),
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: theme.spacing(SAFE_SPACING),
    left: theme.spacing(SAFE_SPACING),
    bottom: theme.spacing(SAFE_SPACING),
  },
});

Buttons.propTypes = {
  actions: PropTypes.array.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default Buttons;
