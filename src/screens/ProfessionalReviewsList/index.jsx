import React, { useState, useCallback } from 'react';
import { View, FlatList } from 'react-native';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import professionalsService from 'api/services/professionals';
import theme from 'common/styles/theme';
import Text from 'components/Text';
import Tabs from 'components/Tabs';
import Stars from 'components/Stars';
import Skeleton from 'components/Skeleton';
import { reviewTypes, REVIEW_TYPES } from './util';
import styles from './style';

const ProfessionalReviewsList = () => {
  const route = useRoute();
  const [type, setType] = useState(REVIEW_TYPES.ALL);
  const [reviews, setReviews] = useState();

  useFocusEffect(
    useCallback(() => {
      setReviews(null);
      const params = {
        type,
      };
      professionalsService
        .listReviews(route.params?.workerId, params)
        .then(setReviews);
    }, [route.params?.workerId, type]),
  );

  return (
    <View style={styles.container}>
      <Text margin={{ bottom: 3 }} size={1.4} weight="bold">
        Avaliações sobre: {route.params?.workerName}
      </Text>

      <Tabs options={reviewTypes} setValue={setType} value={type} />

      <Skeleton
        ready={Boolean(reviews)}
        containerStyle={styles.reviews}
        itemsStyle={styles.skeletonItem}
        length={5}
        direction="column"
      >
        <FlatList
          data={reviews}
          keyExtractor={item => item.id}
          renderItem={({ item: review, index }) => (
            <View
              style={[
                styles.review,
                index !== reviews.length - 1 && {
                  borderBottomColor: theme.colors.lightGrey,
                  borderBottomWidth: theme.borderWidth,
                },
              ]}
            >
              <Stars length={review.rating} size={22} spacing={0.3} />
              <Text weight="bold" margin={{ top: 0.5, bottom: 0.5 }}>
                {review.title}
              </Text>
              <Text>{review.comment}</Text>
            </View>
          )}
        />
      </Skeleton>
    </View>
  );
};

export default ProfessionalReviewsList;
