import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useUser from 'common/contexts/User/useUser';
import Profile from 'screens/Profile';
import ChangePassword from 'screens/ChangePassword';
import Join from 'screens/Join';
import SignUp from 'screens/SignUp';
import Login from 'screens/Login';
import Main from 'components/Main';
import configLayout from 'navigation/configLayout';

const Stack = createNativeStackNavigator();

const User = () => {
  const { signed } = useUser();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {signed ? (
        <>
          <Stack.Screen
            name="Profile"
            component={configLayout(Profile, Main)}
          />
          <Stack.Screen
            name="ChangePassword"
            component={configLayout(ChangePassword, Main, { back: true })}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Join" component={configLayout(Join, Main)} />
          <Stack.Screen
            name="SignUp"
            component={configLayout(SignUp, Main, { back: true })}
          />
          <Stack.Screen
            name="Login"
            component={configLayout(Login, Main, { back: true })}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default User;
