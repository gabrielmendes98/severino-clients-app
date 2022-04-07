import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import toast from 'common/util/toast';
import servicesService from 'api/services/services';
import useStateRef from 'common/hooks/useStateRef';
import SearchInput from 'components/Input/Search';
import Button from 'components/Button';
import Text from 'components/Text';
import Skeleton from 'components/Skeleton';
import Services from './Services';
import styles from './style';

const SearchServices = ({ navigation, route }) => {
  const [searchValue, setSearchValue, searchValueRef] = useStateRef('');
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = useCallback(
    (search = searchValue) => {
      if (!search) {
        toast.error('Digite o serviço que deseja buscar');
        return;
      }
      setLoading(true);

      servicesService.search(search).then(servicesFound => {
        setLoading(false);

        if (servicesFound.length === 0) {
          toast.error('Nenhum serviço encontrado');
          return;
        }

        setServices(servicesFound);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [searchValue],
  );

  useFocusEffect(
    useCallback(() => {
      const search = route.params?.search;
      if (search) {
        setSearchValue(search);
        handleSearch(search);
      }

      return () => {
        navigation.setParams({ search: searchValueRef.current });
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

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

      <Skeleton
        ready={!loading}
        width={12}
        height={12}
        length={5}
        containerStyle={styles.servicesContainer}
        itemsStyle={styles.serviceContainer}
      >
        <Services services={services} />
      </Skeleton>
    </View>
  );
};

SearchServices.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
};

export default SearchServices;
