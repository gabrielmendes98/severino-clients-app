import React from 'react';
import { TouchableHighlight } from 'react-native';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import theme from 'common/styles/theme';
import styles from './style';

const BackButton = props => {
  const { goBack } = useNavigation();

  return (
    <TouchableHighlight onPress={goBack} style={styles.container} {...props}>
      <FontAwesomeIcons
        color={theme.colors.primary}
        name="chevron-left"
        size={theme.spacing(3)}
      />
    </TouchableHighlight>
  );
};

export default BackButton;
