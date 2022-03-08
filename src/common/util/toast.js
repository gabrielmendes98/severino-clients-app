import Toast from 'react-native-toast-message';

const toast = {
  error: message =>
    Toast.show({
      type: 'error',
      text1: message,
    }),
  success: message =>
    Toast.show({
      type: 'success',
      text1: message,
    }),
};

export default toast;
