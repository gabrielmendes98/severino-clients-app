import React from 'react';
import { Linking } from 'react-native';
import PropTypes from 'prop-types';
import { WHATSAPP_URL } from 'common/constants';
import { onlyNumbersFormat } from 'common/util/formatters';
import WhatsAppIcon from 'components/Icons/WhatsApp';

const WhatsappButton = ({ phone }) => {
  const openWhatsapp = () =>
    Linking.openURL(WHATSAPP_URL + onlyNumbersFormat(phone));

  return <WhatsAppIcon size={21} onPress={openWhatsapp} />;
};

WhatsappButton.propTypes = {
  phone: PropTypes.string.isRequired,
};

export default WhatsappButton;
