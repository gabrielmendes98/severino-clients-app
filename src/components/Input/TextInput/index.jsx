import React, { useMemo, useRef } from 'react';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import {
  TextInput as RNTextInput,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import useForm from 'common/providers/Form/useForm';
import Text from 'components/Text';
import createStyles from './style';

const TextInput = ({ placeholder, margin, icon, name, rules, ...props }) => {
  const { control } = useForm();
  const inputRef = useRef();
  const styles = useMemo(
    () => createStyles({ margin }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const focusInput = () => inputRef.current.focus();

  return (
    <Controller
      control={control}
      rules={rules}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <TouchableWithoutFeedback onPress={focusInput}>
          <View style={styles.wrapper}>
            {Boolean(error) && (
              <Text color="red" size={0.8} margin={{ top: -2 }}>
                {error.message}
              </Text>
            )}
            <View style={styles.container}>
              {Boolean(icon) && icon}

              <RNTextInput
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder={placeholder}
                ref={inputRef}
                style={styles.input}
                value={value}
                {...props}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}
      name={name}
    />
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
  rules: PropTypes.object,
};

export default TextInput;
