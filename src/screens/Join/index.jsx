import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Text from 'components/Text';
import Button from 'components/Button';

const Join = ({ navigation }) => {
  const handleSignUpPress = () => {
    navigation.navigate('SignUp');
  };

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  return (
    <View>
      <Text size={1.5} weight="bold" margin={{ bottom: 3 }}>
        Faça login ou crie uma conta!
      </Text>

      <Button fullWidth margin={{ bottom: 2 }} onPress={handleLoginPress}>
        Entrar
      </Button>
      <Button fullWidth variant="outlined" onPress={handleSignUpPress}>
        Criar conta
      </Button>
    </View>
  );
};

Join.propTypes = {
  navigation: PropTypes.object,
};

export default Join;
