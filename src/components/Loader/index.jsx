/* eslint-disable react/function-component-definition */
/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, {
  useState,
  useRef,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import styles from './style';

let currentRef;

const addNewRef = newRef => {
  currentRef = newRef;
};

const removeOldRef = () => {
  currentRef = null;
};

const LoaderRoot = forwardRef((props, ref) => {
  const [loadersCount, setLoadersCount] = useState(0);
  const [show, setShow] = useState(false);

  useImperativeHandle(
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
    if (ref) {
      loaderRef.current = ref;
      addNewRef(ref);
    } else {
      removeOldRef();
    }
  }, []);

  return <LoaderRoot ref={setRef} {...props} />;
}

Loader.show = () => {
  currentRef?.show();
};

Loader.hide = () => {
  currentRef?.hide();
};

export default Loader;
