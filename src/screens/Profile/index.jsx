import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Text from 'components/Text';
import Button from 'components/Button';

const Profile = ({ navigation }) => {
  const handleSignUpPress = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View>
      <Text size={1.5} weight="bold" margin={{ bottom: 3 }}>
        Faça login ou crie uma conta!
      </Text>

      <Button fullWidth margin={{ bottom: 2 }}>
        Entrar
      </Button>
      <Button fullWidth variant="outlined" onPress={handleSignUpPress}>
        Criar conta
      </Button>
    </View>
  );
};

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
