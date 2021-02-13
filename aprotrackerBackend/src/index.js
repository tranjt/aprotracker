const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
  type User {    
    username: String!
    id: ID!
  }

  type Exercise {
    name: String!
    description: String
    type: String!
    createdAt: String
    sets: [ExerciseSet]
  }

  type ExerciseSet {
    kg: Int
    reps: Int
    time: Int
  }

  type Routine {
    name: String!
    description: String
    createdAt: String
    duration: Int
  }   

  type Query {
    allRoutines: [Routine!]!
    allExercises: [Exercise!]!
  }
`

const resolvers = {
  Query: {
    allRoutines: () => routines,
    allExercises: () => exercises
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})