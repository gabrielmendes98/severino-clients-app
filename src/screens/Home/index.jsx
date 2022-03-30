import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import professionalsService from 'api/services/professionals';
import servicesService from 'api/services/services';
import toast from 'common/util/toast';
import Text from 'components/Text';
import SearchInput from 'components/Input/Search';
import Button from 'components/Button';
import Services from './Services';
import Professionals from './Professionals';
import { prepareProfessionals } from './util';

const Home = ({ navigation }) => {
  const [professionals, setProfessionals] = useState();
  const [services, setServices] = useState();
  const [searchValue, setSearchValue] = useState('');

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
      professionalsService
        .listRecent()
        .then(prepareProfessionals)
        .then(setProfessionals);
    }, []),
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

      <Services services={services} />

      <Text margin={{ bottom: 1, top: 4 }} size={1.2} weight="bold">
        Alguns profissionais disponíveis
      </Text>

      <Professionals professionals={professionals} />
    </View>
  );
};

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
