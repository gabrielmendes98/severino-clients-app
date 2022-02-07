import React from 'react';
import { useForm } from 'react-hook-form';
import { Image, View } from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import useUser from 'common/contexts/User/useUser';
import Button from 'components/Button';
import TextInput from 'components/Input/TextInput';
import Text from 'components/Text';
import styles from './style';
import { form, iconCommonProps } from './util';

const SignUp = () => {
  const { signUp } = useUser();
  const { control, handleSubmit } = useForm(form);

  const handleSignUp = data => signUp(data);

  return (
    <View style={styles.container}>
      <Image source={require('assets/signUpDoodle.png')} />
      <Text color="primary" weight="bold" size={1.2} margin={{ bottom: 3 }}>
        Informe seus dados para continuar
      </Text>

      <TextInput
        name="name"
        control={control}
        placeholder="Usuário"
        icon={<IonIcons name="person-outline" {...iconCommonProps} />}
      />
      <TextInput
        name="email"
        control={control}
        placeholder="E-mail"
        icon={<IonIcons name="mail-outline" {...iconCommonProps} />}
      />
      <TextInput
        name="password"
        control={control}
        placeholder="Senha"
        icon={<IonIcons name="lock-closed-outline" {...iconCommonProps} />}
        secureTextEntry
      />

      <Button
        fullWidth
        onPress={handleSubmit(handleSignUp)}
        margin={{ top: 2 }}
      >
        Criar conta
      </Button>
    </View>
  );
};

export default SignUp;
