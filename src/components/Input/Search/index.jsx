import React, { useRef, useState } from 'react';
import { TextInput, View, TouchableWithoutFeedback } from 'react-native';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import theme from 'common/styles/theme';
import styles from './style';

const SearchInput = () => {
  const [value, setValue] = useState('');
  const inputRef = useRef();

  const focusInput = () => inputRef.current.focus();

  return (
    <TouchableWithoutFeedback onPress={focusInput}>
      <View style={styles.container}>
        <FontAwesomeIcons color={theme.colors.grey} name="search" size={20} />

        <TextInput
          onChangeText={setValue}
          ref={inputRef}
          style={styles.input}
          value={value}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SearchInput;
