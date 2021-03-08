import { GET_ROUTINES } from '../graphql/queries';
import { useQuery } from '@apollo/client';


const userRoutines = () => {
  const { data, loading} = useQuery(GET_ROUTINES, {
    fetchPolicy: 'cache-and-network',
  });

  return {
    completedRoutines: data ? data.allRoutines.slice(0).reverse() : [],
    loading
  };
};

export default userRoutines;