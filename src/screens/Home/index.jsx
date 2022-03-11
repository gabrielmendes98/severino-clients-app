import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
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

  const handleSearch = () =>
    servicesService.search(searchValue).then(servicesFound => {
      if (servicesFound.length === 0) {
        toast.error('Nenhum serviço encontrado');
        return;
      }

      navigation.navigate('Search', {
        screen: 'Specific',
        params: {
          generalServiceId: servicesFound[0].generalServiceId,
          specificServiceIds: servicesFound.map(
            service => service.specificServiceId,
          ),
        },
      });
    });

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
