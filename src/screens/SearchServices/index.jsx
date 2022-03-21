import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import toast from 'common/util/toast';
import servicesService from 'api/services/services';
import SearchInput from 'components/Input/Search';
import Button from 'components/Button';
import Text from 'components/Text';
import Services from './Services';

const SearchServices = ({ route }) => {
  const [searchValue, setSearchValue] = useState('');
  const [services, setServices] = useState([]);

  const handleSearch = (search = searchValue) => {
    if (!search) {
      toast.error('Digite o serviço que deseja buscar');
      return;
    }

    servicesService.search(search).then(servicesFound => {
      if (servicesFound.length === 0) {
        toast.error('Nenhum serviço encontrado');
        return;
      }

      setServices(servicesFound);
    });
  };

  useEffect(() => {
    const search = route.params?.search;
    if (search) {
      setSearchValue(search);
      handleSearch(search);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View>
      <Text margin={{ bottom: 3 }} size={1.4} weight="bold">
        Pesquise por serviços
      </Text>

      <SearchInput
        margin={{ bottom: 1.5 }}
        placeholder="Digite o nome de um serviço"
        value={searchValue}
        setValue={setSearchValue}
      />

      <Button fullWidth margin={{ bottom: 3 }} onPress={() => handleSearch()}>
        Buscar
      </Button>

      <Services services={services} />
    </View>
  );
};

SearchServices.propTypes = {
  route: PropTypes.object,
};

export default SearchServices;
