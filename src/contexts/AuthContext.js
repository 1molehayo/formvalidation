import React, {
  createContext,
  useState,
  useMemo,
  useCallback,
  useEffect
} from 'react';

import PropTypes from 'prop-types';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const data = localStorage.getItem('user');
    if (data) {
      setUser(JSON.parse(data));
      setLoggedIn(true);
    }
    setLoading(false);
  }, []);

  const login = useCallback(data => {
    setUser(data);
    setLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(data));
  }, []);

  const logout = useCallback(() => {
    setUser({});
    setLoggedIn(false);
    localStorage.removeItem('user');
  }, []);

  const value = useMemo(
    () => ({
      loggedIn,
      user,
      login,
      logout,
      loading
    }),
    [loggedIn, user, login, loading, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node
};
