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

const Login = () => {
  const { login } = useUser();
  const { control, handleSubmit } = useForm(form);

  const handleLogin = data => login(data);

  return (
    <View style={styles.container}>
      <Image source={require('assets/loginDoodle.png')} style={styles.image} />
      <Text
        color="primary"
        weight="bold"
        size={1.2}
        margin={{ bottom: 4, top: 3 }}
      >
        Informe o seu e-mail e senha para continuar
      </Text>

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

      <Button fullWidth onPress={handleSubmit(handleLogin)} margin={{ top: 2 }}>
        Entrar
      </Button>
    </View>
  );
};

export default Login;
