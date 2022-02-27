import React from 'react';
import { Image, View } from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import useUser from 'common/contexts/User/useUser';
import Form from 'common/providers/Form';
import Button from 'components/Button';
import TextInput from 'components/Input/TextInput';
import Text from 'components/Text';
import styles from './style';
import { form, iconCommonProps } from './util';

const SignUp = () => {
  const { signUp } = useUser();

  const handleSignUp = data => signUp(data);

  return (
    <View style={styles.container}>
      <Image source={require('assets/signUpDoodle.png')} />
      <Text color="primary" weight="bold" size={1.2} margin={{ bottom: 3 }}>
        Informe seus dados para continuar
      </Text>

      <Form {...form}>
        {({ handleSubmit }) => (
          <>
            <TextInput
              name="name"
              placeholder="Nome"
              icon={<IonIcons name="person-outline" {...iconCommonProps} />}
            />
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
              onPress={handleSubmit(handleSignUp)}
              margin={{ top: 2 }}
            >
              Criar conta
            </Button>
          </>
        )}
      </Form>
    </View>
  );
};

export default SignUp;
