import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import theme from 'common/styles/theme';
import Text from 'components/Text';
import TextAvatar from 'components/TextAvatar';
import FavoriteButton from 'components/Button/Favorite';
import WhatsappButton from 'components/Button/Whatsapp';
import styles from './style';

const Worker = ({ worker }) => {
  const navigation = useNavigation();

  const handleNavigation = () =>
    navigation.navigate('Worker', {
      screen: 'Profile',
      params: {
        workerId: worker.id,
      },
    });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleNavigation}
      testID="worker-card-container"
    >
      {worker.avatarUrl ? (
        <Image source={{ uri: worker.avatarUrl }} style={styles.avatar} />
      ) : (
        <TextAvatar text={worker.name} />
      )}

      <View style={styles.card}>
        <View style={styles.evaluation}>
          <FontAwesomeIcons
            color={theme.colors.primary}
            name="star"
            size={20}
          />
          <Text color="primary" margin={{ left: 0.5 }} weight="bold">
            {worker.rating || 'Novo usuário'}
          </Text>
        </View>

        <Text margin={{ bottom: 1 }} numberOfLines={2} weight="bold">
          {worker.name}
        </Text>

        <Text color="light" margin={{ bottom: 2 }} numberOfLines={2}>
          {worker.services}
        </Text>

        <View style={styles.actions}>
          <FavoriteButton workerId={worker.id} />
          {worker.hasWhatsapp && (
            <>
              <Text color="light" size={1.3}>
                |
              </Text>
              <WhatsappButton phone={worker.phone} />
            </>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

Worker.propTypes = {
  worker: PropTypes.object.isRequired,
};

export default Worker;
