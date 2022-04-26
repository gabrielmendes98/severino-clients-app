import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import theme from 'common/styles/theme';
import useLocation from 'common/contexts/Location/useLocation';
import showLocationModal from 'templates/LocationModal/showModal';
import Logo from 'components/Icons/Logo';
import BackButton from 'components/Button/Back';
import withModal from 'components/Modal/withModal';
import Text from 'components/Text';
import styles from './style';

const Header = ({ showModal, back }) => {
  const { location } = useLocation();

  const displayLocation = useMemo(
    () =>
      location
        ? `${location.name}, ${location.state.acronym}`
        : 'Não informado',
    [location],
  );

  return (
    <View style={styles.header} testID="header-container">
      {back ? (
        <BackButton testID="header-back-button" />
      ) : (
        <Logo testID="header-logo" />
      )}
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
          <Text margin={{ left: 1 }}>{displayLocation}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

Header.defaultProps = {
  back: false,
};

Header.propTypes = {
  showModal: PropTypes.func.isRequired,
  back: PropTypes.bool,
};

export default withModal(Header);
