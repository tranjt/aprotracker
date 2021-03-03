import { ApolloClient } from '@apollo/client';
import Constants from 'expo-constants';
import { cache } from '../cache';

const createApolloClient = (authStorage) => {
  return new ApolloClient({
    request: async (operation) => {
      try {
        const accessToken = await authStorage.getAccessToken();
        operation.setContext({
          headers: {
            authorization: accessToken ? `Bearer ${accessToken}` : '',
          },
        });
      } catch (e) {
        console.log(e);
      }
    },
    uri: Constants.manifest.extra.apolloURI,
    cache
  });
};

export default createApolloClient;