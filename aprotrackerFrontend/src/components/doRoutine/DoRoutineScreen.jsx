import React, { useState, useEffect } from 'react';
import { ScrollView, Text, Button, View, StyleSheet, Alert } from 'react-native';
import Constants from 'expo-constants';

import ExerciseCard from './ExerciseCard';
import workoutService from '../../service/workout';
import useInterval from '../../hooks/useInterval';
import Notification from '../Notification';
import useNotifiction from '../../hooks/useNotification';

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

//finishedExercises 
// [
//   {"name":"Pull-up","type":"repsOnly","sets":[{"reps":2}]},
//   {"name":"Squats","type":"repsOnly","sets":[{"reps":2}]},
//   {"name":"Dips","type":"repsOnly","sets":[{"reps":2}]}
// ]
//time 11
//finishedExercises [{"name":"Pull-up","type":"repsOnly","sets":[{"reps":2}]}]
//time 7
// finishedExercises [{"name":"Pull-up","type":"repsOnly","sets":[{"reps":2},{"reps":2}]}]
// time 21


const DoRoutineScreen = ({ navigation, route }) => {
  const [routineName, setRoutineName] = useState('');
  const [exercises, setExercises] = useState([]);
  const [count, setCount] = useState(0);
  const [notifcation, setNotifiction] = useNotifiction();
  const { routineIndex } = route.params;

  useEffect(() => {
    const routine = workoutService.generateRoutineComponentObject(routineIndex);
    //console.log("routine " + JSON.stringify(routine));
    setRoutineName(routine.name);
    setExercises([...routine.exercises]);
    //console.log(`exercises ${JSON.stringify(routine.exercises)}`);
  }, [routineIndex]);

  useInterval(() => {
    setCount(count + 1);
  }, 1000);

  const handleSubmit = (finishedExercises) => {
    console.log("finishedExercises " + JSON.stringify(finishedExercises));
    console.log(`time ${count}`);

  };

  const routineFinished = (doneExercises) => {
    const parsedExercises = workoutService.parseDoneExercises(doneExercises);

    if (parsedExercises.length === 0) {
      setNotifiction("Some sets must be completed to finish routine!");
    }
    else {
      Alert.alert(
        "Are you finished?",
        "All empty or none checked sets will be discarded!",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Finish workout", onPress: () => handleSubmit(parsedExercises) }
        ],
        { cancelable: false }
      );
    }
  };

  const addSet = ({ exerciseIndex, exerciseType }) => {
    const newSet = workoutService.getNewExerciseSet(exerciseType);
    const updatedExercises = [...exercises];

    updatedExercises[exerciseIndex].sets.push(newSet);
    setExercises(updatedExercises);

  };

  const handleChange = ({ value, setIndex, exerciseIndex }) => {
    const updatedExercises = [...exercises];
    // console.log(`exerciseIndex ${exerciseIndex}`);
    // console.log(`setIndex ${setIndex}`);
    // console.log(`value ${value}`);

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
        <Button onPress={() => routineFinished(exercises)} title="Finished" />
      </View>
      <Notification notification={notifcation} />
      <ScrollView >
        <Text>{routineName}</Text>
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