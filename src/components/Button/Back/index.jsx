import React from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight } from 'react-native';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { getColor } from 'common/styles/util';
import theme from 'common/styles/theme';
import styles from './style';

const BackButton = ({ color, testID }) => {
  const { goBack } = useNavigation();

  return (
    <TouchableHighlight
      onPress={goBack}
      style={styles.container}
      testID={testID}
    >
      <FontAwesomeIcons
        color={getColor(color)}
        name="chevron-left"
        size={theme.spacing(3)}
      />
    </TouchableHighlight>
  );
};

BackButton.defaultProps = {
  color: 'primary',
};

BackButton.propTypes = {
  color: PropTypes.string,
  testID: PropTypes.string,
};

export default BackButton;
