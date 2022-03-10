import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import theme from 'common/styles/theme';
import professionalsService from 'api/services/professionals';

const FavoriteButton = ({ workerId, initialFavorite }) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);

  const favorite = () =>
    professionalsService
      .favorite(workerId)
      .then(({ favorited }) => setIsFavorite(favorited));

  return isFavorite ? (
    <FontAwesomeIcons
      onPress={favorite}
      color={theme.colors.red}
      name="heart"
      size={20}
    />
  ) : (
    <FontAwesomeIcons
      onPress={favorite}
      color={theme.colors.black}
      name="heart-o"
      size={20}
    />
  );
};

FavoriteButton.propTypes = {
  workerId: PropTypes.string.isRequired,
  initialFavorite: PropTypes.bool,
};

export default FavoriteButton;
