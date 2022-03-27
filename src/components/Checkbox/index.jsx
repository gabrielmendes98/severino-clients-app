import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import theme from 'common/styles/theme';
import Text from 'components/Text';
import styles from './style';

const Checkbox = ({ label, checked, onValueChange }) => {
  const onPress = () => onValueChange(!checked);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {checked ? (
        <IonIcons
          name="checkbox-outline"
          size={20}
          color={theme.colors.primary}
        />
      ) : (
        <IonIcons name="square-outline" size={20} color={theme.colors.black} />
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
};

export default Checkbox;
