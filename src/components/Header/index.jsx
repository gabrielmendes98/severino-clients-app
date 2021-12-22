import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import theme from 'common/styles/theme';
import Logo from 'components/Icons/Logo';
import styles from './style';

const Header = () => (
  <View style={styles.header}>
    <Logo />
    <View>
      <TouchableOpacity
        onPress={() => {
          console.log('dale');
        }}
        style={styles.location}
      >
        <FontAwesomeIcons
          color={theme.palette.primary.main}
          name="map-marker"
          size={theme.fontSize(2)}
        />
        <Text style={styles.locationText}>Uberlândia, MG</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default Header;
