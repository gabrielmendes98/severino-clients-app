import React from 'react';
// import PropTypes from 'prop-types';
import { View } from 'react-native';
import useUser from 'common/contexts/User/useUser';
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

      <Button fullWidth margin={{ bottom: 2 }}>
        Mudar senha
      </Button>
      <Button fullWidth variant="outlined" onPress={handleLogout}>
        Sair
      </Button>
    </View>
  );
};

// Profile.propTypes = {
//   navigation: PropTypes.object,
// };

export default Profile;
