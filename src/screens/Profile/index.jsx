import React from 'react';
import { View } from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import useUser from 'common/contexts/User/useUser';
import theme from 'common/styles/theme';
import Text from 'components/Text';
import Button from 'components/Button';

const Profile = () => {
  const { user, logout } = useUser();

  const handleLogout = () => logout();

  return (
    <View>
      <Text size={1.5} weight="bold" margin={{ bottom: 3 }}>
        Bem-vindo (a), {user.name}
      </Text>

      <Button
        fullWidth
        margin={{ bottom: 2 }}
        textAlign="left"
        icon={
          <IonIcons
            name="lock-closed-outline"
            size={20}
            color={theme.colors.white}
          />
        }
      >
        Mudar senha
      </Button>
      <Button
        fullWidth
        variant="outlined"
        onPress={handleLogout}
        textAlign="left"
        icon={
          <IonIcons
            name="log-out-outline"
            size={20}
            color={theme.colors.primary}
          />
        }
      >
        Sair
      </Button>
    </View>
  );
};

export default Profile;
