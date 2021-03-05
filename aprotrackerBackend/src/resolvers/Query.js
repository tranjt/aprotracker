const { AuthenticationError } = require('apollo-server')
const Exercise = require('../models/exercise')
const Routine = require('../models/routine')


const allRoutines = (root, args, context) => {
  const currentUser = context.currentUser;

  if (!currentUser) {
    throw new AuthenticationError('not authenticated')
  }

  return Routine.find({ user: currentUser._id }).populate('exercises').populate('user')
}

const allExercises = (root, args, context) => {
  const currentUser = context.currentUser;

  if (!currentUser) {
    throw new AuthenticationError('not authenticated')
  }

  return Exercise.find({ user: currentUser._id }).populate('user')
}

const me = (root, args, context) => {
  return context.currentUser
}


module.exports = {
  allRoutines,
  allExercises,
  me
}