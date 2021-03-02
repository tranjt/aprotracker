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


export const SIGN_UP = gql` 
mutation CreateUser ($username: String!, $password: String!) {
  createUser(
    username: $username",
    password: $password
  ) {
    username
    id  
    createdAt	
  }
}
`;

export const SIGN_IN = gql`
mutation Login ($username: String!, $password: String!) {
  login(
    username: $username",
    password: $password
  ) {
    value
  }
}
`;