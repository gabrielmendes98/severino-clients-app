/* eslint-disable react/function-component-definition */
import React, { useState, useImperativeHandle } from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import styles from './style';

let currentRef;
function Loader() {
  const [loadersCount, setLoadersCount] = useState(0);
  const [show, setShow] = useState(false);

  useImperativeHandle(
    ref => {
      currentRef = ref;
    },
    () => ({
      show: () => {
        setLoadersCount(count => count + 1);
        setShow(true);
      },
      hide: () => {
        if (loadersCount === 1) {
          setShow(false);
          setLoadersCount(count => count - 1);
        } else {
          setLoadersCount(count => count - 1);
        }
      },
    }),
  );

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

Loader.show = () => {
  currentRef?.show();
};

Loader.hide = () => {
  currentRef?.hide();
};

export default Loader;
