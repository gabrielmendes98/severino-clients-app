/* eslint-disable react/function-component-definition */
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Text from 'components/Text';
import styles from './style';

function Loader() {
  const [show, setShow] = useState(false);

  const hideLoader = () => setShow(false);
  const showLoader = () => setShow(true);

  useEffect(() => {
    if (!window.hideLoader) {
      window.hideLoader = hideLoader;
    }

    if (!window.showLoader) {
      window.showLoader = showLoader;
    }
  }, []);

  return (
    show && (
      <View style={styles.container}>
        <Text color="white">loading...</Text>
      </View>
    )
  );
}

export default Loader;
