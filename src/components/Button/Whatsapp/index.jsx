import React from 'react';
import {
  Linking,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { WHATSAPP_URL } from 'common/constants';
import { onlyNumbersFormat } from 'common/util/formatters';
import WhatsAppIcon from 'components/Icons/WhatsApp';

const WhatsappButton = ({ phone }) => {
  const openWhatsapp = () =>
    Linking.openURL(WHATSAPP_URL + onlyNumbersFormat(phone));

  return (
    <TouchableWithoutFeedback onPress={openWhatsapp}>
      <View style={styles.container}>
        <WhatsAppIcon size={21} />
      </View>
    </TouchableWithoutFeedback>
  );
};

WhatsappButton.propTypes = {
  phone: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: { padding: 20, margin: -20 },
});

export default WhatsappButton;
