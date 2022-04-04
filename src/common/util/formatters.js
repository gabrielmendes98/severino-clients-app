const onlyNumbersFormat = value => String(value).replace(/\D/g, '');

const formatPhone = phoneNumberString => {
  var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  var match = cleaned.match(/^(\d{2})(\d{1})(\d{4})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + ' ' + match[3] + '-' + match[4];
  }
  return phoneNumberString;
};

export { onlyNumbersFormat, formatPhone };
