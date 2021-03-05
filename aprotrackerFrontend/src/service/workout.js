import routines from '../data/routines';


const generateRoutineComponentObject = (routineIndex) => {
  const routine = routines[routineIndex];

  const buildTrainingSets = ({ type, sets }) => {
    switch (type) {
      case 'repsOnly':
        return Array.from(Array(sets.setCount),
          () => {
            return {
              reps: '',
              repsPlaceholder: sets.repsPlaceholder,
              validInput: false,
              done: false
            };
          });
      case 'weighted':
        return Array.from(Array(sets.setCount),
          () => {
            return {
              reps: '',
              kg: '',
              kgPlaceholder: sets.kgPlaceholder,
              repsPlaceholder: sets.repsPlaceholder,
              validInput: false,
              done: false
            };
          });
      case 'timed':
        return Array.from(Array(sets.setCount),
          () => {
            return {
              time: '',
              timedPlaceholder: sets.timedPlaceholder,
              validInput: false,
              done: false
            };
          });
      default:
        console.log('traning type not supported');
    }
  };

  return {
    name: routine.name,
    exercises:
      routine.exercises.map(exercise => {
        return {
          name: exercise.name,
          type: exercise.type,
          sets: buildTrainingSets(exercise)
        };
      })
  };
};

const getNewExerciseSet = (exerciseType) => {
  switch (exerciseType) {
    case 'repsOnly':
      return {
        reps: '',
        repsPlaceholder: 5,
        validInput: false,
        done: false
      };
    case 'weighted':
      return {
        kg: '',
        reps: '',
        kgPlaceholder: 25,
        repsPlaceholder: 5,
        validInput: false,
        done: false
      };
    default: //timed
      return {
        time: '',
        timedPlaceholder: '00:30',
        validInput: false,
        done: false
      };
  }
};

const parseDoneSet = (exercise) => {
  return exercise.sets.map(set => {
    if (set.done) {
      switch (exercise.type) {
        case 'repsOnly':
          return {
            reps: Number(set.reps)
          };
        case 'weighted':
          return {
            reps: Number(set.reps),
            kg: Number(set.kg)
          };
        default: //timed
          return {
            time: set.time
          };
      }
    }
  });
};

const parseDoneExercises = (exercises) => {
  const parsedExercises = exercises.map(exercise => {
    return {
      name: exercise.name,
      type: exercise.type,
      //remove non done sets then remove null, undefined set
      sets: parseDoneSet(exercise).filter(ex => ex)
    };
  });
  //remove exercise with empty sets
  return parsedExercises.filter(exercise => exercise.sets.length !== 0);
};

const getRoutines = () => {
  return routines;
};

const getRoutine = (routineIndex) => {
  return routines[routineIndex];
};

export default {
  generateRoutineComponentObject,
  getNewExerciseSet,
  parseDoneExercises,
  getRoutines,
  getRoutine
};