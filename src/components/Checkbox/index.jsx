import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import theme from 'common/styles/theme';
import Text from 'components/Text';
import styles from './style';

const Checkbox = ({ label, checked, onValueChange, testID }) => {
  const onPress = () => onValueChange(!checked);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      testID={testID}
    >
      {checked ? (
        <IonIcons
          name="checkbox-outline"
          size={20}
          color={theme.colors.primary}
          testID={`${testID}-checked`}
        />
      ) : (
        <IonIcons
          name="square-outline"
          size={20}
          color={theme.colors.black}
          testID={`${testID}-unchecked`}
        />
      )}
      <Text margin={{ left: 1.5 }}>{label}</Text>
    </TouchableOpacity>
  );
};

Checkbox.defaultProps = {
  checked: false,
};

Checkbox.propTypes = {
  checked: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onValueChange: PropTypes.func,
  testID: PropTypes.string,
};

export default Checkbox;
