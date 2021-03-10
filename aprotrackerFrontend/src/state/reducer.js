import compareName from '../utils/compareName';


const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT': {
      return {
        ...state,
        exercises: action.payload.localExercises,
        routines: action.payload.localRoutines
      };
    }
    case 'ADD_EXERCISE': {
      return {
        ...state,
        exercises: [...state.exercises, action.newExercise].sort(compareName)
      };
    }
    case 'DELETE_EXERCISE': {
      return {
        ...state,
        exercises: [...state.exercises].filter(exercise => {
          return exercise.name !== action.exerciseName;
        })
      };
    }
    case 'ADD_ROUTINE': {
      return {
        ...state,
        routines: [action.newRoutine, ...state.routines]
      };
    }
    case 'DELETE_ROUTINE': {
      return {
        ...state,
        routines: [...state.routines].filter(routine => {
          return routine.name !== action.routineName;
        })
      };
    }
    case 'LOGGED_IN': {
      return {
        ...state,
        auth: true
      };
    }
    case 'LOGGED_OUT': {
      return {
        ...state,
        auth: false
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export default reducer;