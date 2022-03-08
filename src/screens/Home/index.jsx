import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import professionalsService from 'api/services/professionals';
import servicesService from 'api/services/services';
import Text from 'components/Text';
import SearchInput from 'components/Input/Search';
import Button from 'components/Button';
import Services from './Services';
import Professionals from './Professionals';
import { prepareProfessionals } from './util';

const Home = () => {
  const handleSearch = () => console.log('searching');
  const [professionals, setProfessionals] = useState();
  const [services, setServices] = useState();

  useEffect(() => {
    professionalsService
      .listRecent()
      .then(prepareProfessionals)
      .then(setProfessionals);

    servicesService.listMostSearched().then(setServices);
  }, []);

  return (
    <View>
      <Text margin={{ bottom: 3 }} size={1.4} weight="bold">
        Resolva seus problemas de maneira rápida e fácil
      </Text>

      <SearchInput margin={{ bottom: 1.5 }} placeholder="Busque por serviços" />

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

export default Home;
