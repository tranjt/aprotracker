import { useContext } from 'react';
import { useMutation, useApolloClient } from '@apollo/client';
import { SIGN_IN } from '../graphql/mutations';
import AuthStorageContext from '../contexts/AuthStorageContext';


const useSignIn = () => {
  const [mutate, result] = useMutation(SIGN_IN);
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const payload = await mutate({
      variables: { username, password }
    });
    await authStorage.setAccessToken(payload.data.login.value);
    apolloClient.resetStore();
  };

  return [signIn, result];
};

export default useSignIn;
