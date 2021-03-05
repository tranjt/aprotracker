import { ADD_ROUTINE } from '../graphql/mutations';
import { GET_ROUTINES } from '../graphql/queries';
import { useMutation } from '@apollo/client';


const useAddRoutine = () => {
  const [mutate, result] = useMutation(ADD_ROUTINE);

  const addRoutine = async ({ name, duration, exercises }) => {
    const payload = await mutate({
      variables: { name, duration, exercises },
      update: (store, response) => {
        const dataInStore = store.readQuery({ query: GET_ROUTINES });
        store.writeQuery({
          query: GET_ROUTINES,
          data: {
            ...dataInStore,
            allRoutines: [...dataInStore.allRoutines, response.data.addRoutine]
          }
        });
      }
    });            
    return payload;
  };

  return [addRoutine, result];
};

export default useAddRoutine;


