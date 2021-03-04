const Exercise = require('../models/exercise')
const Routine = require('../models/routine')


const allRoutines = () => {
  return Routine.find({}).populate('exercises').populate('user')
}

const allExercises = () => {
  return Exercise.find({}).populate('user')
}

const me = (root, args, context) => {
  return context.currentUser
}


module.exports = {
  allRoutines,
  allExercises,
  me
}