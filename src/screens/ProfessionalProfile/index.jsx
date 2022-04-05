/* eslint-disable react/no-multi-comp */
import React, { useState, useCallback } from 'react';
import { View, Image, FlatList } from 'react-native';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import theme from 'common/styles/theme';
import professionalsService from 'api/services/professionals';
import { useFavorite, withFavorite } from 'common/contexts/Favorite';
import { formatPhone } from 'common/util/formatters';
import useUser from 'common/contexts/User/useUser';
import FavoriteButton from 'components/Button/Favorite';
import Text from 'components/Text';
import WhatsappButton from 'components/Button/Whatsapp';
import Stars from 'components/Stars';
import Button from 'components/Button';
import styles from './style';

// eslint-disable-next-line react/prop-types
const SectionTitle = ({ children, margin }) => (
  <Text size={1.1} weight="600" color="primary" margin={margin}>
    {children}
  </Text>
);

const ProfessionalProfile = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [data, setData] = useState({});
  const { setFavorites } = useFavorite();
  const { signedPress } = useUser();

  const seeReviews = () => console.log('seeReviews');
  const reviewProfessional = () =>
    navigation.navigate('Search', {
      screen: 'ProfessionalReview',
      params: {
        workerId: route.params?.workerId,
        workerName: data?.name,
      },
    });

  useFocusEffect(
    useCallback(() => {
      professionalsService.getProfile(route.params?.workerId).then(response => {
        setData(response);
        setFavorites({
          [response.id]: true,
        });
      });
    }, [route.params?.workerId, setFavorites]),
  );

  console.log(data);

  return (
    <View>
      <View style={styles.header}>
        <View style={styles.box}>
          <FavoriteButton workerId={data.id} />
        </View>
        <Image source={{ uri: data.avatarUrl }} style={styles.avatar} />
      </View>

      <Text align="center" size={1.2} margin={{ bottom: 0.5 }}>
        {data.name}
      </Text>
      <Stars justify="center" length={data.rating} />

      <View style={styles.numberLocation}>
        <View style={styles.align}>
          {data.hasWhatsapp && <WhatsappButton phone={data.phone} />}
          <Text margin={{ left: 1 }}>{formatPhone(data.phone)}</Text>
        </View>

        <View style={styles.align}>
          <FontAwesomeIcons
            color={theme.colors.primary}
            name="map-marker"
            size={theme.fontSize(2)}
          />
          <Text margin={{ left: 1 }}>{data.location}</Text>
        </View>
      </View>

      <Text align="center" color="light">
        {data.services?.join(' | ')}
      </Text>

      <View style={styles.description}>
        <Text>{data.description}</Text>
      </View>

      <SectionTitle>Meus trabalhos</SectionTitle>
      <FlatList
        data={data.workPhotos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Image source={{ uri: item.url }} style={styles.workPhoto} />
        )}
        horizontal
        style={styles.workPhotos}
        contentContainerStyle={styles.workPhotosWrapper}
      />

      <SectionTitle margin={{ bottom: 2 }}>Experiência</SectionTitle>
      {data.experiences?.map(experience => (
        <View style={styles.whiteBox} key={experience.id}>
          <Text color="light">{experience.role}</Text>
          <Text color="light">{experience.company}</Text>
          <Text color="light">{experience.time}</Text>
        </View>
      ))}

      <SectionTitle margin={{ bottom: 2 }}>Formação Acadêmica</SectionTitle>
      {data.academicGraduations?.map(graduation => (
        <View style={styles.whiteBox} key={graduation.id}>
          <Text color="light">{graduation.degree.description}</Text>
          {Boolean(graduation.studyArea) && (
            <Text color="light">{graduation.studyArea}</Text>
          )}
          <Text color="light">{graduation.institution}</Text>
        </View>
      ))}

      <SectionTitle margin={{ bottom: 2 }}>Competências</SectionTitle>
      {data.skills?.map(skill => (
        <View style={styles.whiteBox} key={skill.id}>
          <Text color="light">{skill.name}</Text>
        </View>
      ))}

      <Button fullWidth onPress={seeReviews} margin={{ bottom: 2 }}>
        Ver avaliações
      </Button>
      <Button
        fullWidth
        variant="outlined"
        onPress={signedPress(reviewProfessional)}
      >
        Avaliar
      </Button>
    </View>
  );
};

export default withFavorite(ProfessionalProfile);
