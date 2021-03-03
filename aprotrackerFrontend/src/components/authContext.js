import React, { createContext, useContext, useState, useMemo } from 'react';

const AuthContext = createContext();

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
};

const AuthProvider = (props) => {
  const [count, setCount] = useState(0);
  const value = useMemo(() => [count, setCount], [count]);
  return <AuthContext.Provider value={value} {...props} />;
};

export { AuthProvider, useAuth };