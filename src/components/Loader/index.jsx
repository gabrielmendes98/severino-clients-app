/* eslint-disable react/function-component-definition */
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import styles from './style';

function Loader() {
  const [show, setShow] = useState(true);

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
        <LottieView
          source={require('../../assets/loader.json')}
          style={styles.animation}
          autoPlay
        />
      </View>
    )
  );
}

export default Loader;
