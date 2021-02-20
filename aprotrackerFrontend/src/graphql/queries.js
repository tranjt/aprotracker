import { gql } from '@apollo/client';

export const GET_ROUTINES = gql`
query{
  allRoutines {
    name
    createdAt
    id
    exercises {
      name            
      createdAt
      routine
      type
      sets {
        reps
        kg
        time
      }
    }
  }
}
`;

