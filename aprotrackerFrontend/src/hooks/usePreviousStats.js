import { GET_LATEST_EXERCISES } from '../graphql/queries';
import { useQuery } from '@apollo/client';


const usePreviousStats = () => {
  const { data, loading } = useQuery(GET_LATEST_EXERCISES, {
    fetchPolicy: 'cache-and-network',
  });

  return {
    latestCompletedExercises: data ? data.allLatestExercises : [],
    loading
  };
};

export default usePreviousStats;