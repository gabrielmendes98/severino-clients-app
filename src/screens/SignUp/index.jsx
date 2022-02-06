import React from 'react';
import { useForm } from 'react-hook-form';
import { Image, View } from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import useUser from 'common/contexts/User/useUser';
import Button from 'components/Button';
import TextInput from 'components/Input/TextInput';
import Text from 'components/Text';
import styles from './style';
import { iconCommonProps } from './util';

const SignUp = () => {
  const { signUp } = useUser();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const handleSignUp = data => signUp(data);

  return (
    <View style={styles.container}>
      <Image source={require('assets/signUpDoodle.png')} />
      <Text color="primary" weight="bold" size={1.2} margin={{ bottom: 4 }}>
        Informe seus dados para continuar
      </Text>

      <TextInput
        name="name"
        control={control}
        placeholder="Usuário"
        margin={{ bottom: 2 }}
        icon={<IonIcons name="person-outline" {...iconCommonProps} />}
      />
      <TextInput
        name="email"
        control={control}
        placeholder="E-mail"
        margin={{ bottom: 2 }}
        icon={<IonIcons name="mail-outline" {...iconCommonProps} />}
      />
      <TextInput
        name="password"
        control={control}
        placeholder="Senha"
        margin={{ bottom: 2 }}
        icon={<IonIcons name="lock-closed-outline" {...iconCommonProps} />}
        secureTextEntry
      />

      <Button fullWidth onPress={handleSubmit(handleSignUp)}>
        Criar conta
      </Button>
    </View>
  );
};

export default SignUp;
