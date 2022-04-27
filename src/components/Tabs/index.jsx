import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import Text from 'components/Text';
import styles, { getOptionStyles } from './style';

const Tabs = ({ value, setValue, options }) => (
  <View style={styles.container}>
    {options.map(option => (
      <TouchableOpacity
        style={getOptionStyles(option.value, value)}
        onPress={() => setValue(option.value)}
        key={option.value}
        testID={
          option.value === value
            ? `selected-${option.value}`
            : `unselected-${option.value}`
        }
      >
        <Text
          align="center"
          color={option.value === value ? 'primary' : ''}
          size={1.1}
        >
          {option.label}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

Tabs.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string,
    }).isRequired,
  ),
};

export default Tabs;
