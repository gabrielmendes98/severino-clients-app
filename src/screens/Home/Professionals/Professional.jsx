import React from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import { formatList } from 'common/util/format';
import theme from 'common/styles/theme';
import WhatsAppIcon from 'components/Icons/WhatsApp';
import Text from 'components/Text';
import styles from './style';

const Professional = ({ professional }) => (
  <View style={styles.container}>
    <Image source={{ uri: professional.avatarUrl }} style={styles.avatar} />

    <View style={styles.card}>
      <View style={styles.evaluation}>
        <FontAwesomeIcons color={theme.colors.primary} name="star" size={20} />
        <Text color="primary" margin={{ left: 0.5 }} weight="bold">
          {professional.evaluation}
        </Text>
      </View>

      <Text margin={{ bottom: 1 }} numberOfLines={2} weight="bold">
        {professional.name}
      </Text>

      <Text color="light" margin={{ bottom: 2 }} numberOfLines={2}>
        {formatList(professional.services)}
      </Text>

      <View style={styles.actions}>
        <FontAwesomeIcons color={theme.colors.black} name="heart-o" size={20} />
        <Text color="light" size={1.3}>
          |
        </Text>
        <WhatsAppIcon size={21} />
      </View>
    </View>
  </View>
);

Professional.propTypes = {
  professional: PropTypes.object.isRequired,
};

export default Professional;
