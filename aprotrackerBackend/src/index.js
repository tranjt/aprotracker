const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')

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
    sets: [{ reps: 5 }, { reps: 5 }, { reps: 5 },],
    createdAt: "1979-01-30",
    id: "pull-1"
  },
  {
    name: 'Squats',
    type: 'repsOnly',
    sets: [{ reps: 5 }, { reps: 5 }, { reps: 5 },],
    createdAt: "1979-01-30",
    id: "squa-1"
  },
  {
    name: 'Pull-up',
    type: 'repsOnly',
    sets: [{ reps: 5 }, { reps: 5 }, { reps: 5 },],
    createdAt: "1979-01-39",
    id: "pull-2"
  },
  {
    name: 'Squats',
    type: 'repsOnly',
    sets: [{ reps: 5 }, { reps: 5 }, { reps: 5 },],
    createdAt: "1979-01-29",
    id: "squa-2"
  },
  {
    name: 'Pull-up',
    type: 'repsOnly',
    sets: [{ reps: 5 }, { reps: 5 }, { reps: 5 },],
    createdAt: "1979-01-28",
    id: "pull-3"
  },
  {
    name: 'Squats',
    type: 'repsOnly',
    sets: [{ reps: 5 }, { reps: 5 }, { reps: 5 },],
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
    routineId: ID
  }

  type ExerciseSet {
    kg: Int
    reps: Int
    time: Int
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

  type Mutation {
    addRoutine(
      name: String!,
      duration: Int!,
      exercises: [ExerciseInput]
      ): Routine
  }
`
const createExercise = (args, routineId) => {
  const newExercise = { ...args, id: uuid(), createdAt: Date(), routineId }
  exercises.push(newExercise)
}


const resolvers = {
  Query: {
    allRoutines: () => routines,
    allExercises: () => exercises
  },

  Mutation: {
    addRoutine: (root, args) => {
      const { name, duration, exercises } = args
      const newRoutine = { name, duration, id: uuid(), createdAt: Date() }
      exercises.forEach(exercise => {
        createExercise(exercise, newRoutine.id)
      });

      routines.push(newRoutine)
      return newRoutine
    }
  }


}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})