const { UserInputError, AuthenticationError } = require('apollo-server')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Exercise = require('../models/exercise')
const Routine = require('../models/routine')
const User = require('../models/user')
const config = require('../utils/config.js')


const JWT_SECRET = config.TOKEN_SECRET

const createExercise = async (exerciseInput, newRoutine, currentUser) => {
  const newExercise = new Exercise({
    ...exerciseInput,
    routine: newRoutine._id,
    user: currentUser._id
  })

  try {
    await newExercise.save()
    return newExercise

  } catch (error) {
    console.log('error' + error);
  }
}

const addRoutine = async (root, args, context) => {
  const currentUser = context.currentUser

  if (!currentUser) {
    throw new AuthenticationError('not authenticated')
  }

  const { name, duration, exercises } = args
  const newRoutine = new Routine({ name, duration, user: currentUser._id })
  await newRoutine.save()

  for (let exerciseInput of exercises) {
    try {
      let newExercise = await createExercise(exerciseInput, newRoutine, currentUser)
      newRoutine.exercises.push(newExercise._id)
      await newRoutine.save()

    } catch (error) {
      console.log('error' + error);
    }
  }

  return newRoutine.populate('exercises').execPopulate()
}

const  createUser = async (root, args) => {
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
}

const login = async (root, args) => {
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
}


module.exports = {
  addRoutine,
  createUser,
  login
}