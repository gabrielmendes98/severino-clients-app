/* eslint-disable react/no-multi-comp */
import React, { useState, useCallback } from 'react';
import { View, Image, FlatList, StatusBar } from 'react-native';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import theme from 'common/styles/theme';
import workersService from 'api/services/workers';
import { useFavorite, withFavorite } from 'common/contexts/Favorite';
import { formatPhone } from 'common/util/formatters';
import useUser from 'common/contexts/User/useUser';
import FavoriteButton from 'components/Button/Favorite';
import ListFallback from 'components/ListFallback';
import Text from 'components/Text';
import WhatsappButton from 'components/Button/Whatsapp';
import Stars from 'components/Stars';
import List from 'components/List';
import Button from 'components/Button';
import styles from './style';
import Loading from './Loading';

// eslint-disable-next-line react/prop-types
const SectionTitle = ({ children, margin }) => (
  <Text size={1.1} weight="600" color="primary" margin={margin}>
    {children}
  </Text>
);

const WorkerProfile = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [data, setData] = useState();
  const { setFavorites } = useFavorite();
  const { signedPress } = useUser();

  const seeReviews = () =>
    navigation.navigate('Worker', {
      screen: 'ReviewsList',
      params: {
        workerId: route.params?.workerId,
        workerName: data?.name,
      },
    });

  const reviewWorker = () =>
    navigation.navigate('Worker', {
      screen: 'Review',
      params: {
        workerId: route.params?.workerId,
        workerName: data?.name,
      },
    });

  useFocusEffect(
    useCallback(() => {
      workersService.getProfile(route.params?.workerId).then(response => {
        setData(response);
        setFavorites({
          [response.id]: response.isFavorite,
        });
      });
    }, [route.params?.workerId, setFavorites]),
  );

  if (!data) {
    return <Loading />;
  }

  return (
    <View>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.primary}
      />

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

      <SectionTitle margin={{ bottom: 2 }}>Meus trabalhos</SectionTitle>

      {data.workPhotos?.length ? (
        <FlatList
          data={data.workPhotos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Image source={{ uri: item.url }} style={styles.workPhoto} />
          )}
          style={styles.workPhotos}
          contentContainerStyle={styles.workPhotosWrapper}
          horizontal
        />
      ) : (
        <ListFallback
          icon="image-outline"
          message="Este profissional não adicionou fotos de seus trabalhos"
          size={0.8}
        />
      )}

      <SectionTitle margin={{ bottom: 2 }}>Experiência</SectionTitle>
      <List
        data={data.experiences}
        keyExtractor={item => item.id}
        renderItem={({ item: experience }) => (
          <View style={styles.whiteBox}>
            <Text color="light">{experience.role}</Text>
            <Text color="light">{experience.company}</Text>
            <Text color="light">{experience.time}</Text>
          </View>
        )}
        ListEmptyComponent={
          <ListFallback
            icon="list-outline"
            message="Este profissional não adicionou experiências profissionais"
            size={0.8}
          />
        }
      />

      <SectionTitle margin={{ bottom: 2 }}>Formação Acadêmica</SectionTitle>
      <List
        data={data.academicGraduations}
        keyExtractor={item => item.id}
        renderItem={({ item: graduation }) => (
          <View style={styles.whiteBox}>
            <Text color="light">{graduation.degree.description}</Text>
            {Boolean(graduation.studyArea) && (
              <Text color="light">{graduation.studyArea}</Text>
            )}
            <Text color="light">{graduation.institution}</Text>
          </View>
        )}
        ListEmptyComponent={
          <ListFallback
            icon="list-outline"
            message="Este profissional não adicionou sua formação acadêmica"
            size={0.8}
          />
        }
      />

      <SectionTitle margin={{ bottom: 2 }}>Competências</SectionTitle>
      <List
        data={data.skills}
        keyExtractor={item => item.id}
        renderItem={({ item: skill }) => (
          <View style={styles.whiteBox}>
            <Text color="light">{skill.name}</Text>
          </View>
        )}
        ListEmptyComponent={
          <ListFallback
            icon="list-outline"
            message="Este profissional não adicionou competências"
            size={0.8}
          />
        }
      />

      <Button fullWidth onPress={seeReviews} margin={{ bottom: 2, top: 2 }}>
        Ver avaliações
      </Button>
      <Button fullWidth variant="outlined" onPress={signedPress(reviewWorker)}>
        Avaliar
      </Button>
    </View>
  );
};

export default withFavorite(WorkerProfile);
