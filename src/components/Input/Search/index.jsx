import React, { useRef, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { TextInput, View, TouchableWithoutFeedback } from 'react-native';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import theme from 'common/styles/theme';
import createStyles from './style';

const SearchInput = ({ placeholder, margin }) => {
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
        <FontAwesomeIcons color={theme.colors.grey} name="search" size={20} />

        <TextInput
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

SearchInput.propTypes = {
  margin: PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
  }),
  placeholder: PropTypes.string.isRequired,
};

export default SearchInput;
