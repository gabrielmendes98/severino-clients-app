import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import workersService from 'api/services/workers';
import servicesService from 'api/services/services';
import { withFavorite, useFavorite } from 'common/contexts/Favorite';
import toast from 'common/util/toast';
import Text from 'components/Text';
import SearchInput from 'components/Input/Search';
import Skeleton from 'components/Skeleton';
import Button from 'components/Button';
import Services from './Services';
import Workers from './Workers';
import { prepareWorkers } from './util';

const Home = ({ navigation }) => {
  const [workers, setWorkers] = useState();
  const [services, setServices] = useState();
  const [searchValue, setSearchValue] = useState('');
  const { setFavorites } = useFavorite();

  const handleSearch = () => {
    if (!searchValue) {
      toast.error('Digite o serviço que deseja buscar');
      return;
    }

    navigation.navigate('Search', {
      screen: 'Services',
      params: {
        search: searchValue,
      },
    });
  };

  useEffect(() => {
    servicesService.listMostSearched().then(setServices);
  }, []);

  useFocusEffect(
    useCallback(() => {
      workersService
        .listRecent()
        .then(prepareWorkers)
        .then(([preparedWorkers, favorites]) => {
          setWorkers(preparedWorkers);
          setFavorites(favorites);
        });
    }, [setFavorites]),
  );

  return (
    <View>
      <Text margin={{ bottom: 3 }} size={1.4} weight="bold">
        Resolva seus problemas de maneira rápida e fácil
      </Text>

      <SearchInput
        margin={{ bottom: 1.5 }}
        placeholder="Busque por serviços"
        value={searchValue}
        setValue={setSearchValue}
      />

      <Button fullWidth margin={{ bottom: 3 }} onPress={handleSearch}>
        Buscar
      </Button>

      <Text margin={{ bottom: 1 }} size={1.2} weight="bold">
        Alguns serviços disponíveis
      </Text>

      <Skeleton ready={Boolean(services)} length={5} width={12} height={12}>
        <Services services={services} />
      </Skeleton>

      <Text margin={{ bottom: 1, top: 4 }} size={1.2} weight="bold">
        Alguns profissionais disponíveis
      </Text>

      <Skeleton ready={Boolean(workers)} length={5} width={23} height={27}>
        <Workers workers={workers} />
      </Skeleton>
    </View>
  );
};

Home.propTypes = {
  navigation: PropTypes.object,
};

export default withFavorite(Home);
