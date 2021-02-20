import { gql } from '@apollo/client';

export const ADD_ROUTINE = gql`
mutation routineDone($name: String!, $duration: Int!, $exercises: [ExerciseInput]){
  addRoutine(
    name: $name, 
    duration: $duration, 
    exercises: $exercises
  ) {
    name 
    duration   
  }
}
`;
