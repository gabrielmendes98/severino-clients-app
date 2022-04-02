/* eslint-disable react/no-multi-comp */
import React, { useState, useCallback } from 'react';
import { View, Image } from 'react-native';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import theme from 'common/styles/theme';
import professionalsService from 'api/services/professionals';
import { useFavorite, withFavorite } from 'common/contexts/Favorite';
import FavoriteButton from 'components/Button/Favorite';
import Text from 'components/Text';
import WhatsappButton from 'components/Button/Whatsapp';
import Stars from 'components/Stars';
import Button from 'components/Button';
import styles from './style';

// eslint-disable-next-line react/prop-types
const SectionTitle = ({ title }) => (
  <Text size={1.2} color="primary">
    {title}
  </Text>
);

const ProfessionalProfile = () => {
  const route = useRoute();
  const [data, setData] = useState({});
  const { setFavorites } = useFavorite();

  const seeReviews = () => console.log('seeReviews');
  const reviewProfessional = () => console.log('reviewProfessional');

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
          <Text margin={{ left: 1 }}>{data.phone}</Text>
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
      {/* LISTA HORIZONTAL passando data.workPhotos */}

      <SectionTitle>Experiência</SectionTitle>
      {data.experiences?.map(experience => (
        <View style={styles.whiteBox} key={experience.id}>
          <Text color="light">{experience.role}</Text>
          <Text color="light">{experience.company}</Text>
          <Text color="light">{experience.time}</Text>
        </View>
      ))}

      <SectionTitle>Formação Acadêmica</SectionTitle>
      {data.academicGraduations?.map(graduation => (
        <View style={styles.whiteBox} key={graduation.id}>
          <Text color="light">{graduation.degree.description}</Text>
          {graduation.studyArea && (
            <Text color="light">{graduation.studyArea}</Text>
          )}
          <Text color="light">{graduation.institution}</Text>
        </View>
      ))}

      <SectionTitle>Competências</SectionTitle>
      {data.skills?.map(skill => (
        <View style={styles.whiteBox} key={skill.id}>
          <Text color="light">{skill.name}</Text>
        </View>
      ))}

      <Button fullWidth onPress={seeReviews} margin={{ bottom: 2 }}>
        Ver avaliações
      </Button>
      <Button fullWidth variant="outlined" onPress={reviewProfessional}>
        Avaliar
      </Button>
    </View>
  );
};

export default withFavorite(ProfessionalProfile);
