import { gql } from '@apollo/client';

export const ADD_ROUTINE = gql`
mutation routineDone($name: String!, $duration: Int!, $exercises: [ExerciseInput]){
  addRoutine(
    name: $name, 
    duration: $duration, 
    exercises: $exercises
  ) {
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
