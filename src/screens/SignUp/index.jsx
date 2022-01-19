import React from 'react';
import { Image, View } from 'react-native';
import Button from 'components/Button';
import TextInput from 'components/Input/TextInput';
import Text from 'components/Text';

const SignUp = () => {
  const handleSignUp = () => {
    console.log('criando conta...');
  };

  return (
    <View>
      <Image source={require('assets/signUpDoodle.png')} />
      <Text>Informe seus dados para continuar</Text>

      <TextInput placeholder="Digite seu usuário" />
      <TextInput placeholder="Digite seu e-mail" />
      <TextInput placeholder="Digite sua senha" />

      <Button onPress={handleSignUp}>Criar conta</Button>
    </View>
  );
};

export default SignUp;
