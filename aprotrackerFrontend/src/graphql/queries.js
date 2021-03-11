import { gql } from '@apollo/client';


export const GET_ROUTINES = gql`
query{
  allRoutines {
    name
    createdAt
    duration
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
  
  me {
    username
    createdAt
    id
  }
}
`;

export const GET_LATEST_EXERCISES = gql`
query {
  allLatestExercises {
    name
    createdAt
    type
    routine
    sets {
      reps
      time
      kg
    }
    user{
      username
      id
    }
    
  }
}
`;

