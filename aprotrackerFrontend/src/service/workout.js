
const generateRoutineComponentObject = (routine) => {
  const buildTrainingSets = ({ type, sets }) => {
    switch (type) {
      case 'repsOnly':
        return Array.from(Array(sets.setCount),
          () => {
            return {
              reps: "",
              repsPlaceholder: sets.repsPlaceholder,
              validInput: false,
              done: false
            };
          });
      case 'weighted':
        return Array.from(Array(sets.setCount),
          () => {
            return {
              reps: "",
              kg: 0,
              repsPlaceholder: sets.repsPlaceholder,
              validInput: false,
              done: false
            };
          });
      case 'timed':
        return Array.from(Array(sets.setCount),
          () => {
            return {
              time: 0,
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
        // console.log("exercise " + JSON.stringify(exercise));
        // console.log();
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
    case "repsOnly":
      return {
        reps: "",
        repsPlaceholder: 5,
        validInput: false,
        done: false
      };
    case "weighted":
      return {
        kg: "",
        reps: "",
        repsPlaceholder: 5,
        validInput: false,
        done: false
      };
    default:
      return {
        time: "",
        validInput: false,
        done: false
      };
  }
};

const secondsToHms = (d) => {
  d = Number(d);
  const h = Math.floor(d / 3600);
  const m = Math.floor(d % 3600 / 60);
  const s = Math.floor(d % 3600 % 60);

  const hDisplay = h > 0 ? (h < 10 ? "0" : "") + h + ":" : "";
  const mDisplay = m > 0 ? (m < 10 ? "0" : "") + m + ":" : "";
  const sDisplay = s > 0 ? (s < 10 ? "0" : "") + s : "";
  return hDisplay + mDisplay + sDisplay;
};

const parseDoneSet = (exercise) => {
  return exercise.sets.map(set => {
    if (set.done) {
      switch (exercise.type) {
        case "repsOnly":
          return {
            reps: Number(set.reps)
          };
        case "weighted":
          return {
            reps: Number(set.reps),
            kg: Number(set.kg)
          };
        default:
          return {
            time: Number(set.time)
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


export default {
  generateRoutineComponentObject,
  getNewExerciseSet,
  secondsToHms,
  parseDoneExercises
};