import { SIGN_UP } from '../graphql/mutations';
import { useMutation } from '@apollo/client';


const useSignUp = () => {
  const [mutate, result] = useMutation(SIGN_UP);

  const signUp = async ({ username, password }) => {
    const payload = await mutate({
      variables: { username, password }
    });
    return payload;
  };

  return [signUp, result];
};

export default useSignUp;
