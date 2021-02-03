
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
        console.log("exercise " + JSON.stringify(exercise));
        console.log();
        return {
          name: exercise.name,
          type: exercise.type,
          sets: buildTrainingSets(exercise)
        };
      })
  };
};

export default {
  generateRoutineComponentObject
};