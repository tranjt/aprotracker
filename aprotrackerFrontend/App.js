import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';

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