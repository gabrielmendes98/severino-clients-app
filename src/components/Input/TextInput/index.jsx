import React, { useRef, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  TextInput as RNTextInput,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import createStyles from './style';

const TextInput = ({ placeholder, margin, icon }) => {
  const [value, setValue] = useState('');
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

        <RNTextInput
          onChangeText={setValue}
          placeholder={placeholder}
          ref={inputRef}
          style={styles.input}
          value={value}
        />
      </View>
    </TouchableWithoutFeedback>
  );
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
};

export default TextInput;
