import React, { useState, useEffect } from 'react';
import { ScrollView, Text, Button, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import ExerciseCard from './ExerciseCard';
import routines from '../../data/routines';
import workoutService from '../../service/workout';
import useInterval from '../hooks/useInterval';

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

// {
//   "name":"Pull-up",
//   "type":"repsOnly",
//   "sets":[
//     {"reps":"","repsPlaceholder":5,"validInput":false,"done":false},
//     {"reps":"","repsPlaceholder":5,"validInput":false,"done":false},
//     {"reps":"","repsPlaceholder":5,"validInput":false,"done":false},
//     {"reps":"1111","repsPlaceholder":5,"valid":false,"done":false}
//   ]
// }


const DoRoutineScreen = ({ navigation }) => {
  const [routineName, setRoutineName] = useState('');
  const [exercises, setExercises] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const routine = workoutService.generateRoutineComponentObject(routines[2]);
    //console.log("routine " + JSON.stringify(routine));
    setRoutineName(routine.name);
    setExercises([...routine.exercises]);
    console.log(`exercises ${JSON.stringify(routine.exercises)}`);
  }, []);

  useInterval(() => {
    setCount(count + 1);
  }, 1000);

  const addSet = ({ exerciseIndex, exerciseType }) => {
    const newSet = workoutService.getNewExerciseSet(exerciseType);
    const updatedExercises = [
      ...exercises,
      exercises[exerciseIndex].sets.push(newSet)
    ];

    setExercises([...updatedExercises]);
  };

  // const handleSubmit = ()=> {
  //   // just save everything even node ids
  //   // then use target on server side
  // };

  const handleChange = ({ value, setIndex, exerciseIndex }) => {
    const updatedExercises = [...exercises];

    console.log(`exerciseIndex ${exerciseIndex}`);
    console.log(`setIndex ${setIndex}`);
    console.log(`value ${value}`);

    if (Number(value) > 0) {
      updatedExercises[exerciseIndex].sets[setIndex].validInput = true;
    } else {
      updatedExercises[exerciseIndex].sets[setIndex].validInput = false;
      updatedExercises[exerciseIndex].sets[setIndex].done = false;
    }

    updatedExercises[exerciseIndex].sets[setIndex].reps = value;
    setExercises(updatedExercises);
  };

  const handleExerciseSetDone = ({ checkboxValue, setIndex, exerciseIndex }) => {
    const updatedExercises = [...exercises];
    updatedExercises[exerciseIndex].sets[setIndex].done = checkboxValue;
    setExercises(updatedExercises);
  };


  return (
    <View style={styles.container}>
      <View>
        <Text>Duration: {workoutService.secondsToHms(count)}</Text>
      </View>
      <Text>Do Routine Screen!</Text>
      <Text>{routineName}</Text>
      <ScrollView >
        {
          exercises.map((exercise, exerciseIndex) => (
            <ExerciseCard
              key={`exercise-${exerciseIndex}`}
              exercise={exercise}
              exerciseIndex={exerciseIndex}
              handleChange={handleChange}
              handleExerciseSetDone={handleExerciseSetDone}
              addSet={addSet}
            />
          ))
        }
        <Button onPress={() => navigation.navigate('History', { someParam: 'Workout done here are the stats' })} title="goTo History" />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
});

export default DoRoutineScreen;