import { ADD_ROUTINE } from '../graphql/mutations';
import { useMutation } from '@apollo/client';


const useAddRoutine = () => {
  const [mutate, result] = useMutation(ADD_ROUTINE);

  const addRoutine = async ({name, duration, exercises}) => {
        
    const payload = await mutate({ variables: { name, duration, exercises } });
    return payload;
  };  

  return [addRoutine, result];
};

export default useAddRoutine;


