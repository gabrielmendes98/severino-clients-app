import React from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import theme from 'common/styles/theme';
import workersService from 'api/services/workers';
import { useFavorite } from 'common/contexts/Favorite';

const FavoriteButton = ({ workerId, style, testID }) => {
  const { favorites, updateFavorite } = useFavorite();

  const favorite = () =>
    workersService
      .favorite(workerId)
      .then(({ favorited }) => updateFavorite(workerId, favorited));

  return (
    <TouchableWithoutFeedback onPress={favorite} testID={testID}>
      <View style={styles.container}>
        {favorites[workerId] ? (
          <FontAwesomeIcons
            color={theme.colors.red}
            name="heart"
            size={20}
            style={style}
            testID={`${testID}-filled`}
          />
        ) : (
          <FontAwesomeIcons
            color={theme.colors.black}
            name="heart-o"
            size={20}
            style={style}
            testID={`${testID}-outline`}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

FavoriteButton.defaultProps = {
  testID: 'favorite-button',
};

FavoriteButton.propTypes = {
  workerId: PropTypes.string.isRequired,
  style: PropTypes.object,
  testID: PropTypes.string,
};

const styles = StyleSheet.create({
  container: { padding: 20, margin: -20 },
});

export default FavoriteButton;
