import { ApolloClient, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Constants from 'expo-constants';

import { cache } from '../cache';


const createApolloClient = (authStorage) => {
  const httpLink = createHttpLink({
    uri: Constants.manifest.extra.apolloURI
  });

  const authLink = setContext(async (_, { headers }) => {
    const accessToken = await authStorage.getAccessToken();

    return {
      headers: {
        ...headers,
        authorization: accessToken ? `Bearer ${accessToken}` : '',
      }
    };
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache
  });
};

export default createApolloClient;