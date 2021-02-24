const { ApolloServer, gql } = require('apollo-server')
const config = require('./utils/config.js')
const mongoose = require('mongoose')
const Exercise = require('./models/exercise')
const Routine = require('./models/routine')


console.log('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


const typeDefs = gql`
  type User {    
    username: String!
    id: ID!
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
    createdAt: String!
    duration: Int!
    exercises: [Exercise!]!
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


const createExercise = async (exerciseInput, newRoutine) => {
  const newExercise = new Exercise({
    ...exerciseInput,
    routine: newRoutine._id
  })
  try {
    await newExercise.save()
    return newExercise

  } catch (error) {
    console.log('error' + error);
  }
}


const resolvers = {
  Query: {
    allRoutines: () => Routine.find({}).populate("exercises"),
    allExercises: () => Exercise.find({})
  },

  Mutation: {
    addRoutine: async (root, args) => {
      const { name, duration, exercises } = args
      const newRoutine = new Routine({ name, duration })
      await newRoutine.save()

      for (let exerciseInput of exercises) {
        try {
          let newExercise = await createExercise(exerciseInput, newRoutine)
          newRoutine.exercises.push(newExercise._id)
          await newRoutine.save()
        } catch (error) {
          console.log('error' + error);
        }
      }

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