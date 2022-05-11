import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';
import usersService from 'api/services/user';
import { setToken, getToken, removeToken } from 'common/util/storage';
import toast from 'common/util/toast';
import store from 'common/util/store';

const UserContext = createContext();
UserContext.displayName = 'UserContext';

const { Provider } = UserContext;

const UserProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

  const configureUser = ({ token }) => {
    setToken(token);
    const decodedToken = jwtDecode(token);
    setUser(decodedToken.user);
    store.setJwt(token);
  };

  const login = loginInfo => usersService.login(loginInfo).then(configureUser);

  const signUp = userData => usersService.create(userData).then(configureUser);

  const logout = () => {
    setUser(null);
    store.setJwt(null);
    return removeToken();
  };

  const changePassword = data => usersService.update(data);

  const signedPress = callback => () => {
    if (user) {
      callback();
      return;
    }

    toast.error('Você precisa estar logado para realizar essa ação');
  };

  useEffect(() => {
    getToken().then(token => {
      if (token) {
        const decodedToken = jwtDecode(token);
        setUser(decodedToken.user);
        store.setJwt(token);
      }
      setLoading(false);
    });
  }, []);

  return (
    <Provider
      value={{
        user,
        signed: Boolean(user),
        signUp,
        login,
        logout,
        signedPress,
        changePassword,
        loading,
      }}
    >
      {children}
    </Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.any.isRequired,
};

export { UserContext, Provider };
export default UserProvider;
