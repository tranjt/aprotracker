const { ApolloServer, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const config = require('./utils/config.js')
const Exercise = require('./models/exercise')
const Routine = require('./models/routine')
const User = require('./models/user')
const typeDefs = require('./typeDefs')


const JWT_SECRET = config.TOKEN_SECRET

console.log('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


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
    allRoutines: () => Routine.find({}).populate('exercises'),
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

      return newRoutine.populate('exercises').execPopulate()
    },

    createUser: async (root, args) => {      

      const saltRounds = 10
      const passwordHash = await bcrypt.hash(args.password, saltRounds)
      const user = new User({
        username: args.username,
        passwordHash
      })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(args.password, user.passwordHash)

      if (!(user && passwordCorrect)) {
        throw new UserInputError('invalid username or password')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  }

}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})