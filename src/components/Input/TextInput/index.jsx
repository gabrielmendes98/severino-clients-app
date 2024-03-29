import React, { useMemo, useRef } from 'react';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import {
  TextInput as RNTextInput,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import useForm from 'common/contexts/Form/useForm';
import { focus } from 'common/util/general';
import Text from 'components/Text';
import createStyles from './style';

const TextInput = ({
  placeholder,
  margin,
  icon,
  name,
  rules,
  style,
  endIcon,
  containerProps: { style: containerStyle, ...containerProps },
  ...props
}) => {
  const { control } = useForm();
  const inputRef = useRef();
  const styles = useMemo(
    () => createStyles({ margin }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <Controller
      control={control}
      rules={rules}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <TouchableWithoutFeedback
          onPress={() => focus(inputRef)}
          testID={`${name}-container`}
        >
          <View style={styles.wrapper}>
            {Boolean(error) && (
              <Text
                color="red"
                size={0.8}
                margin={{ top: -2 }}
                testID={`${name}-input-error`}
              >
                {error.message}
              </Text>
            )}
            <View
              style={[styles.container, containerStyle]}
              {...containerProps}
            >
              {Boolean(icon) && icon}

              <RNTextInput
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder={placeholder}
                ref={inputRef}
                style={[styles.input, style]}
                value={value}
                testID={name}
                {...props}
              />

              {Boolean(endIcon) && endIcon}
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
  containerProps: {},
};

TextInput.propTypes = {
  icon: PropTypes.node,
  endIcon: PropTypes.node,
  margin: PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
  }),
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  rules: PropTypes.object,
  style: PropTypes.object,
  containerProps: PropTypes.object,
};

export default TextInput;
