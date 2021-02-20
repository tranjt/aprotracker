import {ApolloClient} from '@apollo/client';
import Constants from 'expo-constants';
import { cache } from '../cache';

const createApolloClient = () => {
  return new ApolloClient({
    uri: Constants.manifest.extra.apolloURI,
    cache
  });
};

export default createApolloClient;