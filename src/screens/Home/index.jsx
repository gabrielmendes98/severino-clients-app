import React from 'react';
import { View } from 'react-native';
import Text from 'components/Text';
import SearchInput from 'components/Input/Search';
import Button from 'components/Button';

const Home = () => {
  const handleSearch = () => console.log('handling...');

  return (
    <View>
      <Text size={1.4} weight="bold">
        Resolva seus problemas de maneira rápida e fácil
      </Text>

      <SearchInput />

      <Button fullWidth onPress={handleSearch}>
        Buscar
      </Button>
    </View>
  );
};

export default Home;
