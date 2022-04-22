import React, { useState } from 'react';
import PropTypes from 'prop-types';
import IonIcons from 'react-native-vector-icons/Ionicons';
import theme from 'common/styles/theme';
import TextInput from '../TextInput';

const PasswordInput = ({ name, placeholder, showStartIcon }) => {
  const [showing, setShowing] = useState();

  const toggleShowing = () => setShowing(init => !init);

  return (
    <TextInput
      name={name}
      placeholder={placeholder}
      icon={
        showStartIcon && (
          <IonIcons
            name="lock-closed-outline"
            color={theme.colors.primary}
            size={20}
          />
        )
      }
      secureTextEntry={!showing}
      endIcon={
        showing ? (
          <IonIcons
            name="eye-outline"
            color={theme.colors.primary}
            size={20}
            onPress={toggleShowing}
            testID={`${name}-hide-icon`}
          />
        ) : (
          <IonIcons
            name="eye-off-outline"
            color={theme.colors.primary}
            size={20}
            onPress={toggleShowing}
            testID={`${name}-show-icon`}
          />
        )
      }
    />
  );
};

PasswordInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  showStartIcon: PropTypes.bool,
};

export default PasswordInput;
