import React from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight } from 'react-native';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { getColor } from 'common/styles/util';
import theme from 'common/styles/theme';
import styles from './style';

const BackButton = ({ color }) => {
  const { goBack } = useNavigation();

  return (
    <TouchableHighlight onPress={goBack} style={styles.container}>
      <FontAwesomeIcons
        color={color ? getColor(color) : theme.colors.primary}
        name="chevron-left"
        size={theme.spacing(3)}
      />
    </TouchableHighlight>
  );
};

BackButton.propTypes = {
  color: PropTypes.string,
};

export default BackButton;
