import React, { useState, useEffect } from 'react';
import { ScrollView, Text, Button, View, StyleSheet, Alert } from 'react-native';
import Constants from 'expo-constants';

import ExerciseCard from './ExerciseCard';
import workoutService from '../../service/workout';
import useInterval from '../../hooks/useInterval';
import Notification from '../Notification';
import useNotifiction from '../../hooks/useNotification';
import useAddRoutine from '../../hooks/useAddRoutine';
import { secondsToHms } from '../../utils/timedate';

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
  const [addRoutine] = useAddRoutine();

  useEffect(() => {
    const routine = workoutService.generateRoutineComponentObject(routineIndex);
    setRoutineName(routine.name);
    setExercises([...routine.exercises]);

  }, [routineIndex]);

  useInterval(() => {
    setCount(count + 1);
  }, 1000);

  const handleSubmit = async (finishedExercises) => {
    const testRoutine = {
      name: routineName,
      duration: count,
      exercises: finishedExercises
    };
    console.log("testRoutine" + JSON.stringify(testRoutine));

    try {
      await addRoutine({
        name: routineName,
        duration: count,
        exercises: finishedExercises
      });
      navigation.navigate("History");
    } catch (error) {
      console.log(error);
    }

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

  const handleChange = ({ value, setIndex, exerciseIndex, exerciseType }) => {
    const updatedExercises = [...exercises];
    //swith exerciseIndex to get exersize type
    //  reps
    // timed
    // weigted
    // addd kg to handleChange

    switch (exerciseType) {
      case "repsOnly": 
        if (Number(value) > 0) {
          updatedExercises[exerciseIndex].sets[setIndex].validInput = true;
        } else {
          updatedExercises[exerciseIndex].sets[setIndex].validInput = false;
          updatedExercises[exerciseIndex].sets[setIndex].done = false;
        }
        updatedExercises[exerciseIndex].sets[setIndex].reps = value;      
        break;

      default:
        break;
    }

    // if (Number(value) > 0) {
    //   updatedExercises[exerciseIndex].sets[setIndex].validInput = true;
    // } else {
    //   updatedExercises[exerciseIndex].sets[setIndex].validInput = false;
    //   updatedExercises[exerciseIndex].sets[setIndex].done = false;
    // }

    // updatedExercises[exerciseIndex].sets[setIndex].reps = value;
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
        <Text>Duration: {secondsToHms(count)}</Text>
        <Button onPress={() => routineFinished(exercises)} title="Finished" />
      </View>
      <Notification notification={notifcation} />
      <ScrollView >
        <Text>{routineName}</Text>
        {
          exercises.map((exercise, exerciseIndex) => (
            // check type repsExercrisdeCard timed exersize card  wieghted card
            // switch
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