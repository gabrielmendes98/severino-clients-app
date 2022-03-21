import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { SvgCssUri } from 'react-native-svg';
import theme from 'common/styles/theme';
import Text from 'components/Text';
import styles from './style';

const Service = ({ id, avatarUrl, name }) => {
  const onPress = () => {
    console.log(id);
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.serviceContainer}>
        <Shadow
          distance={5}
          offset={[0, 1]}
          startColor={theme.colors.boxShadow.start}
        >
          <View style={styles.card}>
            <SvgCssUri height="100%" uri={avatarUrl} width="100%" />
          </View>
        </Shadow>
        <Text margin={{ top: 0.5 }} weight="bold">
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

Service.propTypes = {
  id: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default memo(Service);
