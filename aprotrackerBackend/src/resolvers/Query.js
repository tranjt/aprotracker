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

const allLatestExercises = async (root, args, context) => {
  const currentUser = context.currentUser;

  if (!currentUser) {
    throw new AuthenticationError('not authenticated')
  }

  const exercises = await Exercise.find({ user: currentUser._id }).sort({ createdAt: -1 }).populate('user')
  const uniqueNames = [];

  const uniqueExercises = await exercises.filter(exercise => {
    if (!uniqueNames.includes(exercise.name)) {
      uniqueNames.push(exercise.name)
      return true;
    }
    return false;
  })

  return uniqueExercises;
}

module.exports = {
  allRoutines,
  allExercises,
  allLatestExercises,
  me
}