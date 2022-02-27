import React from 'react';
import { Image, View } from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Form from 'common/providers/Form';
import useUser from 'common/contexts/User/useUser';
import Button from 'components/Button';
import TextInput from 'components/Input/TextInput';
import Text from 'components/Text';
import styles from './style';
import { form, iconCommonProps } from './util';

const Login = () => {
  const { login } = useUser();

  const handleLogin = data => login(data);

  return (
    <View style={styles.container}>
      <Image source={require('assets/loginDoodle.png')} style={styles.image} />
      <Form {...form}>
        {({ handleSubmit }) => (
          <>
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
              placeholder="E-mail"
              icon={<IonIcons name="mail-outline" {...iconCommonProps} />}
            />

            <TextInput
              name="password"
              placeholder="Senha"
              icon={
                <IonIcons name="lock-closed-outline" {...iconCommonProps} />
              }
              secureTextEntry
            />

            <Button
              fullWidth
              onPress={handleSubmit(handleLogin)}
              margin={{ top: 2 }}
            >
              Entrar
            </Button>
          </>
        )}
      </Form>
    </View>
  );
};

export default Login;
