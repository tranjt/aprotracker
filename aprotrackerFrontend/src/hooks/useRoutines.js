import { GET_ROUTINES } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const userRoutines = () => {
  const { data, loading} = useQuery(GET_ROUTINES, {
    fetchPolicy: 'cache-and-network',
  });

  return {
    routines: data ? data.allRoutines : undefined,
    loading
  };
};

export default userRoutines;