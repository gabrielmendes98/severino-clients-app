import React from 'react';
import { View } from 'react-native';
import Text from 'components/Text';
import SearchInput from 'components/Input/Search';
import Button from 'components/Button';
import Services from './Services';
import Professionals from './Professionals';

const Home = () => {
  const handleSearch = () => console.log('handling...');

  const services = [
    {
      id: 1,
      imageUrl:
        'https://st2.depositphotos.com/1017986/6484/i/950/depositphotos_64848789-stock-photo-close-up-of-male-brooming.jpg',
      name: 'Limpeza',
    },
    {
      id: 2,
      imageUrl:
        'https://st2.depositphotos.com/1017986/6484/i/950/depositphotos_64848789-stock-photo-close-up-of-male-brooming.jpg',
      name: 'Limpeza',
    },
    {
      id: 3,
      imageUrl:
        'https://st2.depositphotos.com/1017986/6484/i/950/depositphotos_64848789-stock-photo-close-up-of-male-brooming.jpg',
      name: 'Limpeza',
    },
    {
      id: 4,
      imageUrl:
        'https://st2.depositphotos.com/1017986/6484/i/950/depositphotos_64848789-stock-photo-close-up-of-male-brooming.jpg',
      name: 'Limpeza',
    },
    {
      id: 5,
      imageUrl:
        'https://st2.depositphotos.com/1017986/6484/i/950/depositphotos_64848789-stock-photo-close-up-of-male-brooming.jpg',
      name: 'Limpeza',
    },
  ];

  const professionals = [
    {
      id: 1,
      avatarUrl:
        'https://st2.depositphotos.com/1017986/6484/i/950/depositphotos_64848789-stock-photo-close-up-of-male-brooming.jpg',
      evaluation: 4.5,
      name: 'Pedro Faria',
      services: ['Pedreiro', 'Carpinteiro', 'Eletricista', 'Faxineiro'],
    },
  ];

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
