const { gql } = require('apollo-server')

const typeDefs = gql`
  type User {    
    username: String!
    id: ID!
    createdAt: String!
  }

  type Token {
    value: String!
  }

  type Exercise {
    name: String!
    description: String
    type: String!
    createdAt: String!
    sets: [ExerciseSet!]!
    id: ID!
    routine: ID!
  }

  type ExerciseSet {
    kg: Int
    reps: Int
    time: String
  }

  input ExerciseInput {
    name: String!
    description: String
    type: String!    
    sets: [ExerciseSetInput]   
  }

  input ExerciseSetInput {
    kg: Int
    reps: Int
    time: String
  }

  type Routine {
    name: String!
    description: String
    createdAt: String!
    duration: Int!
    exercises: [Exercise!]!
    id: ID!
  }   
  

  type Query {
    allRoutines: [Routine!]!
    allExercises: [Exercise!]!
    me: User
  }

  type Mutation {
    addRoutine(
      name: String!,
      duration: Int!,
      exercises: [ExerciseInput]
      ): Routine

    createUser(
      username: String!
      password: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token 
  }
`

module.exports = typeDefs