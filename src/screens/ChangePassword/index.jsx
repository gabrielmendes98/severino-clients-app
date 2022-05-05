import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, View } from 'react-native';
import Form from 'common/contexts/Form';
import useUser from 'common/contexts/User/useUser';
import toast from 'common/util/toast';
import Button from 'components/Button';
import PasswordInput from 'components/Input/Password';
import Text from 'components/Text';
import styles from './style';
import { form } from './util';

const ChangePassword = () => {
  const { changePassword } = useUser();
  const navigation = useNavigation();

  const handleLogin = data => {
    changePassword(data).then(() => {
      toast.success('Senha alterada com sucesso');
      navigation.navigate('Home');
    });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('assets/changePassword.png')}
        style={styles.image}
      />
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
              Trocar senha
            </Text>

            <PasswordInput name="currentPassword" placeholder="Senha atual" />

            <PasswordInput name="newPassword" placeholder="Nova senha" />

            <PasswordInput
              name="newPasswordConfirm"
              placeholder="Confirme a nova senha"
            />

            <Button
              fullWidth
              onPress={handleSubmit(handleLogin)}
              margin={{ top: 2 }}
            >
              Salvar
            </Button>
          </>
        )}
      </Form>
    </View>
  );
};

export default ChangePassword;
