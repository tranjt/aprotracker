import React from 'react';
import { ApolloProvider } from '@apollo/client';

import Main from './src/components/Main';
import createApolloClient from './src/utils/apolloClient';
import AuthStorage from './src/utils/authStorage';
import { AuthProvider } from './src/components/authContext';
import AuthStorageContext from './src/contexts/AuthStorageContext';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

const App = () => {

  return (
    <ApolloProvider client={apolloClient}>
      <AuthStorageContext.Provider value={authStorage}>
        <AuthProvider>
          <Main />
        </AuthProvider>
      </AuthStorageContext.Provider>
    </ApolloProvider >
  );
};

export default App;