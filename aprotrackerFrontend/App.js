import React from 'react';
import { ApolloProvider } from '@apollo/client';

import Main from './src/components/Main';
import createApolloClient from './src/utils/apolloClient';

const apolloClient = createApolloClient();

const App = () => {

  
  return (
    <ApolloProvider client={apolloClient}>
      <Main />
    </ApolloProvider>
  );
};

export default App;