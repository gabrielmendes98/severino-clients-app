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
        'https://cdn-icons.flaticon.com/png/512/573/premium/573848.png?token=exp=1640715884~hmac=d0c5c8611a8b37bb2f3bb4ed5ccbfd64',
      name: 'Limpeza',
    },
    {
      id: 2,
      imageUrl:
        'https://cdn-icons.flaticon.com/png/512/573/premium/573848.png?token=exp=1640715884~hmac=d0c5c8611a8b37bb2f3bb4ed5ccbfd64',
      name: 'Limpeza',
    },
    {
      id: 3,
      imageUrl:
        'https://cdn-icons.flaticon.com/png/512/573/premium/573848.png?token=exp=1640715884~hmac=d0c5c8611a8b37bb2f3bb4ed5ccbfd64',
      name: 'Limpeza',
    },
    {
      id: 4,
      imageUrl:
        'https://cdn-icons.flaticon.com/png/512/573/premium/573848.png?token=exp=1640715884~hmac=d0c5c8611a8b37bb2f3bb4ed5ccbfd64',
      name: 'Limpeza',
    },
    {
      id: 5,
      imageUrl:
        'https://cdn-icons.flaticon.com/png/512/573/premium/573848.png?token=exp=1640715884~hmac=d0c5c8611a8b37bb2f3bb4ed5ccbfd64',
      name: 'Limpeza',
    },
  ];

  const professionals = [
    {
      id: 1,
      avatarUrl:
        'https://imgsapp2.correiobraziliense.com.br/app/noticia_127983242361/2019/04/12/749144/20190412122053420189e.jpg',
      evaluation: 4.5,
      name: 'Gabriel Mendes de Souza Santiago',
      services: [
        'Pedreiro',
        'Carpinteiro',
        'Eletricista',
        'Faxineiro',
        'dale',
        'dale',
        'dale',
      ],
    },
    {
      id: 2,
      avatarUrl:
        'https://imgsapp2.correiobraziliense.com.br/app/noticia_127983242361/2019/04/12/749144/20190412122053420189e.jpg',
      evaluation: 4.5,
      name: 'Pedro',
      services: ['Pedreiro'],
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
