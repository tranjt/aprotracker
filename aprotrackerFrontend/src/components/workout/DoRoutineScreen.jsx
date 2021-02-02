import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import routines from '../../data/routines';
import ExerciseCard from './ExerciseCard';


const generateRoutineComponentObject = (routine) => {
  const buildTrainingSets = ({ type, sets }) => {
    switch (type) {
      case 'repsOnly':
        return Array.from(Array(sets.setCount),
          () => {
            return {
              reps: "",
              repsPlaceholder: sets.repsPlaceholder,
              valid: false,
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
              valid: false,
              done: false
            };
          });
      case 'timed':
        return Array.from(Array(sets.setCount),
          () => {
            return {
              time: 0,
              valid: false,
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

// const testgeneration = {
//   name: 'recommended routine',
//   componentType: 'routine',
//   exercises: [
//     {
//       name: 'Pull-up',
//       type: 'repsOnly',
//       sets: [
//         { setNumber: 1, reps: 0, repsPlaceholder: 5 },
//         { setNumber: 2, reps: 0, repsPlaceholder: 5 },
//         { setNumber: 3, reps: 0, repsPlaceholder: 5 }
//       ]
//     },
//     {
//       name: 'Squats',
//       type: 'repsOnly',
//       sets: [
//         { setNumber: 1, reps: 0, repsPlaceholder: 5 },
//         { setNumber: 2, reps: 0, repsPlaceholder: 5 },
//         { setNumber: 3, reps: 0, repsPlaceholder: 5 } 

//         { reps: "", repsPlaceholder: 5, valid: false, done: false  } 
//         { reps: "", repsPlaceholder: 5, valid: false, done: false  } 
//         { reps: "", repsPlaceholder: 5, valid: false, done: false  } 
//       ]
//     }
//   ]
// };


const DoRoutineScreen = ({ navigation }) => {
  const [routineName, setRoutineName] = useState('');
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const routine = generateRoutineComponentObject(routines[0]);
    console.log("routine " + JSON.stringify(routine));
    setRoutineName(routine.name);

    setExercises([...routine.exercises]);
  }, []);


  // const addSet = (set, exerciseIndex) => {
  //   setExercises(
  //     [
  //       ...exercises,
  //       exercises[exerciseIndex].set.push(set)
  //     ]
  //   );
  // };

  // update value
  //exerciseIndex, setId, inputname  (  exercises[exerciseIndex].set[setId][inputname] = 2)


  // const handleSubmit = ()=> {
  //   // just save everything even node ids
  //   // then use target on server side
  // };

  const handleChange = (value, exerciseIndex, setId) => {
    //const updatedExercises = [...exercises];

    console.log(`exerciseIndex ${exerciseIndex}`);
    console.log(`setId ${setId}`);
    console.log(`value ${value}`);
    //updatedExercises[exerciseIndex].set[setId] =value;
    //setExercises(updatedExercises);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Do Routine Screen!</Text>
      <Text>{routineName}</Text>

      {
        exercises.map((exercise, exerciseIndex) => (
          <ExerciseCard
            key={`exercise-${exerciseIndex}`}
            exercise={exercise}
            exerciseIndex={exerciseIndex}
            handleChange={handleChange}
          // addSet={addSet}
          />
        ))
      }

      <Button onPress={() => navigation.navigate('History', { someParam: 'Workout done here are the stats' })} title="goTo History" />


    </View>
  );
};


export default DoRoutineScreen;