import React, { useMemo, useRef } from 'react';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import {
  TextInput as RNTextInput,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import createStyles from './style';

const TextInput = ({ placeholder, margin, icon, name, control, rules }) => {
  const inputRef = useRef();
  const styles = useMemo(
    () => createStyles({ margin }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const focusInput = () => inputRef.current.focus();

  return (
    <TouchableWithoutFeedback onPress={focusInput}>
      <View style={styles.container}>
        {Boolean(icon) && icon}

        <Controller
          control={control}
          rules={rules}
          render={({ field: { onChange, onBlur, value } }) => (
            <RNTextInput
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder={placeholder}
              ref={inputRef}
              style={styles.input}
              value={value}
            />
          )}
          name={name}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

TextInput.defaultProps = {
  rules: {},
};

TextInput.propTypes = {
  icon: PropTypes.node,
  margin: PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
  }),
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  rules: PropTypes.object,
};

export default TextInput;
