import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import theme from 'common/styles/theme';
import professionalsService from 'api/services/professionals';
import { useFavorite } from 'common/contexts/Favorite';

const FavoriteButton = ({ workerId, style }) => {
  const { favorites, updateFavorite } = useFavorite();

  const favorite = () =>
    professionalsService
      .favorite(workerId)
      .then(({ favorited }) => updateFavorite(workerId, favorited));

  return favorites[workerId] ? (
    <FontAwesomeIcons
      onPress={favorite}
      color={theme.colors.red}
      name="heart"
      size={20}
      style={style}
    />
  ) : (
    <FontAwesomeIcons
      onPress={favorite}
      color={theme.colors.black}
      name="heart-o"
      size={20}
      style={style}
    />
  );
};

FavoriteButton.propTypes = {
  workerId: PropTypes.string.isRequired,
  style: PropTypes.object,
};

export default FavoriteButton;
