import React from 'react';
import PropTypes from 'prop-types';
import { Image, View } from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Form from 'common/contexts/Form';
import useUser from 'common/contexts/User/useUser';
import Button from 'components/Button';
import TextInput from 'components/Input/TextInput';
import PasswordInput from 'components/Input/Password';
import Text from 'components/Text';
import styles from './style';
import { form, iconCommonProps } from './util';

const Login = ({ navigation, route }) => {
  const { login } = useUser();

  const handleLogin = data =>
    login(data).then(() => {
      if (route.params?.redirect) {
        navigation.goBack();
      }
    });

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
              align="center"
            >
              Informe o seu e-mail e senha para continuar
            </Text>

            <TextInput
              name="email"
              placeholder="E-mail"
              autoCapitalize="none"
              icon={<IonIcons name="mail-outline" {...iconCommonProps} />}
            />

            <PasswordInput name="password" placeholder="Senha" showStartIcon />

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

Login.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default Login;
