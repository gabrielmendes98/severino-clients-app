/* eslint-disable react/function-component-definition */
/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { useState, useRef, useCallback } from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import styles from './style';

let refs = [];

const addNewRef = newRef =>
  refs.push({
    current: newRef,
  });

const removeOldRef = oldRef => {
  refs = refs.filter(r => r.current !== oldRef);
};

const LoaderRoot = React.forwardRef((props, ref) => {
  const [loadersCount, setLoadersCount] = useState(0);
  const [show, setShow] = useState(false);

  React.useImperativeHandle(
    ref,
    useCallback(
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
      [setShow, loadersCount],
    ),
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
});

function Loader(props) {
  const loaderRef = useRef(null);

  const setRef = useCallback(ref => {
    // Since we know there's a ref, we'll update `refs` to use it.
    if (ref) {
      // store the ref in this toast instance to be able to remove it from the array later when the ref becomes null.
      loaderRef.current = ref;
      addNewRef(ref);
    } else {
      // remove the this toast's ref, wherever it is in the array.
      removeOldRef(loaderRef.current);
    }
  }, []);

  return <LoaderRoot ref={setRef} {...props} />;
}

const getRef = () => {
  const reversePriority = [...refs].reverse();
  const activeRef = reversePriority.find(ref => ref?.current !== null);
  if (!activeRef) {
    return null;
  }
  return activeRef.current;
};

Loader.show = () => {
  getRef()?.show();
};

Loader.hide = () => {
  getRef()?.hide();
};

export { Loader as default };
