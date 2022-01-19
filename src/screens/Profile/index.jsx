import React from 'react';
import { View } from 'react-native';
import Text from 'components/Text';
import Button from 'components/Button';

const Profile = () => (
  <View>
    <Text size={1.5} weight="bold" margin={{ bottom: 3 }}>
      Faça login ou crie uma conta!
    </Text>

    <Button fullWidth margin={{ bottom: 2 }}>
      Entrar
    </Button>
    <Button fullWidth variant="outlined">
      Criar conta
    </Button>
  </View>
);

export default Profile;
