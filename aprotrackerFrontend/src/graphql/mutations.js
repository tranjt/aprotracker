import { gql } from 'apollo-boost';

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
