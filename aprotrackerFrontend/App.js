import React from 'react';
import { ApolloProvider } from '@apollo/client';

import Main from './src/components/Main';
import createApolloClient from './src/utils/apolloClient';
import AuthStorage from './src/utils/authStorage';
import { AuthProvider } from './src/components/authContext';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

const App = () => {

  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <Main />
      </AuthProvider>
    </ApolloProvider>
  );
};

export default App;