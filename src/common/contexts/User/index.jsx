import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';
import AppLoading from 'expo-app-loading';
import usersService from 'api/services/user';
import { setToken, getToken, removeToken } from 'common/util/storage';
import { baseApi } from 'api/apis';

const UserContext = createContext();
UserContext.displayName = 'UserContext';

const { Provider } = UserContext;

const setApiHeaders = token => {
  baseApi.defaults.headers.Authorization = token ? `Bearer ${token}` : '';
};

const UserProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

  const configureUser = ({ token }) => {
    setToken(token);
    const decodedToken = jwtDecode(token);
    setUser(decodedToken.user);
    setApiHeaders(token);
  };

  const login = loginInfo => usersService.login(loginInfo).then(configureUser);

  const signUp = userData => usersService.create(userData).then(configureUser);

  const logout = () => {
    setUser(null);
    setApiHeaders(null);
    return removeToken();
  };

  useEffect(() => {
    getToken().then(token => {
      if (token) {
        const decodedToken = jwtDecode(token);
        setUser(decodedToken.user);
        setApiHeaders(token);
      }
      setLoading(false);
    });
  }, []);

  return (
    <Provider value={{ user, signed: Boolean(user), signUp, login, logout }}>
      {loading ? <AppLoading /> : children}
    </Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserContext };
export default UserProvider;
