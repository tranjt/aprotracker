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
  const [auth, setAuth] = useState(false);
  const value = useMemo(() => [auth, setAuth], [auth]);
  
  return <AuthContext.Provider value={value} {...props} />;
};

export { AuthProvider, useAuth };