const { ApolloServer, gql } = require('apollo-server')

const routines = [
  {
    name: 'Mini recommended routine',
    createdAt: "1979-01-30",
    duration: 200,    
    id: "rout-1"
  },
  {
    name: 'Mini recommended routine',
    createdAt: "1979-01-29",
    duration: 200,    
    id: "rout-2"
  },
  {
    name: 'Mini recommended routine',
    createdAt: "1979-01-29",
    duration: 200,    
    id: "rout-3"
  }
]

const exercises = [
  {
    name: 'Pull-up',
    type: 'repsOnly',
    sets: [{ reps: 5 },{ reps: 5 },{ reps: 5 },],
    createdAt: "1979-01-30",
    id: "pull-1"
  },
  {
    name: 'Squats',
    type: 'repsOnly',
    sets: [{ reps: 5 },{ reps: 5 },{ reps: 5 },],
    createdAt: "1979-01-30",
    id: "squa-1"
  },
  {
    name: 'Pull-up',
    type: 'repsOnly',
    sets: [{ reps: 5 },{ reps: 5 },{ reps: 5 },],
    createdAt: "1979-01-39",
    id: "pull-2"
  },
  {
    name: 'Squats',
    type: 'repsOnly',
    sets: [{ reps: 5 },{ reps: 5 },{ reps: 5 },],
    createdAt: "1979-01-29",
    id: "squa-2"
  },
  {
    name: 'Pull-up',
    type: 'repsOnly',
    sets: [{ reps: 5 },{ reps: 5 },{ reps: 5 },],
    createdAt: "1979-01-28",
    id: "pull-3"
  }, 
  {
    name: 'Squats',
    type: 'repsOnly',
    sets: [{ reps: 5 },{ reps: 5 },{ reps: 5 },],
    createdAt: "1979-01-28",
    id: "squa-3"
  },
]



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
    id: ID!
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
    id: ID!
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