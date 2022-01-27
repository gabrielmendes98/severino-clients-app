import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, View } from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import useUser from 'common/contexts/User/useUser';
import Button from 'components/Button';
import TextInput from 'components/Input/TextInput';
import Text from 'components/Text';
import styles from './style';
import { iconCommonProps } from './util';

const SignUp = () => {
  const { navigate } = useNavigation();
  const { signUp } = useUser();

  const handleSignUp = () => {
    signUp().then(() => navigate('ProfileInfo'));
  };

  return (
    <View style={styles.container}>
      <Image source={require('assets/signUpDoodle.png')} />
      <Text color="primary" weight="bold" size={1.2} margin={{ bottom: 4 }}>
        Informe seus dados para continuar
      </Text>

      <TextInput
        placeholder="Usuário"
        margin={{ bottom: 2 }}
        icon={<IonIcons name="person-outline" {...iconCommonProps} />}
      />
      <TextInput
        placeholder="E-mail"
        margin={{ bottom: 2 }}
        icon={<IonIcons name="mail-outline" {...iconCommonProps} />}
      />
      <TextInput
        placeholder="Senha"
        margin={{ bottom: 2 }}
        icon={<IonIcons name="lock-closed-outline" {...iconCommonProps} />}
      />

      <Button fullWidth onPress={handleSignUp}>
        Criar conta
      </Button>
    </View>
  );
};

export default SignUp;
