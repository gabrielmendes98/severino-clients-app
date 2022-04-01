import React from 'react';
import PropTypes from 'prop-types';
import IonIcons from 'react-native-vector-icons/Ionicons';
import theme from 'common/styles/theme';

const starsArray = length => {
  const array = [];
  let total = length;

  for (let i = 0; i < 5; i++) {
    if (total >= 1) {
      array.push('star');
      total--;
    } else if (total < 1 && total > 0) {
      array.push('star-half');
      total--;
    } else {
      array.push('star-outline');
    }
  }

  return array;
};

const Stars = ({ length }) =>
  starsArray(length).map((starType, index) => (
    <IonIcons
      key={index}
      name={starType}
      size={20}
      color={theme.colors.primary}
    />
  ));

Stars.propTypes = {
  length: PropTypes.number,
};

export default Stars;
