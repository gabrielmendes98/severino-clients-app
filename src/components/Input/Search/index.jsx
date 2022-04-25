import React, { useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { TextInput, View, TouchableWithoutFeedback } from 'react-native';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import theme from 'common/styles/theme';
import { focus } from 'common/util/general';
import createStyles from './style';

const SearchInput = ({
  placeholder,
  margin,
  value,
  setValue,
  testID,
  ...props
}) => {
  const inputRef = useRef();

  const styles = useMemo(
    () => createStyles({ margin }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <TouchableWithoutFeedback
      onPress={() => focus(inputRef)}
      testID={`${testID}-container`}
    >
      <View style={styles.container}>
        <FontAwesomeIcons color={theme.colors.grey} name="search" size={20} />

        <TextInput
          onChangeText={setValue}
          placeholder={placeholder}
          ref={inputRef}
          style={styles.input}
          value={value}
          testID={testID}
          {...props}
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
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  testID: PropTypes.string,
};

export default SearchInput;
