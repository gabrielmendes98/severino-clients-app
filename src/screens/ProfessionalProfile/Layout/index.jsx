import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from 'components/Button/Back';
import Container from 'components/Container';
import styles from './style';

const ProfessionalProfileLayout = ({ children }) => (
  <SafeAreaView style={styles.container}>
    <View style={styles.header}>
      <BackButton color="white" />
    </View>

    <ScrollView keyboardShouldPersistTaps="handled">
      <Container>{children}</Container>
    </ScrollView>
  </SafeAreaView>
);

ProfessionalProfileLayout.propTypes = {
  children: PropTypes.any.isRequired,
};

export default ProfessionalProfileLayout;
