import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import theme from 'common/styles/theme';
import Logo from 'components/Icons/Logo';
import BackButton from 'components/Button/Back';
import withModal from 'components/Modal/withModal';
import Text from 'components/Text';
import showLocationModal from 'components/LocationModal/showModal';
import styles from './style';

const Header = ({ showModal, back }) => (
  <View style={styles.header}>
    {back ? <BackButton /> : <Logo />}
    <View>
      <TouchableOpacity
        onPress={() => showLocationModal(showModal)}
        style={styles.location}
      >
        <FontAwesomeIcons
          color={theme.colors.primary}
          name="map-marker"
          size={theme.fontSize(2)}
        />
        <Text margin={{ left: 1 }}>Uberlândia, MG</Text>
      </TouchableOpacity>
    </View>
  </View>
);

Header.propTypes = {
  showModal: PropTypes.func.isRequired,
  back: PropTypes.bool,
};

export default withModal(Header);
