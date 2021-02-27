import React, { useState, useEffect } from 'react';
import { ScrollView, Text, Button, View, StyleSheet, Alert } from 'react-native';
import Constants from 'expo-constants';

import RepsExerciseCard from './RepsExerciseCard';
import TimedExerciseCard from './TimedExerciseCard';
import workoutService from '../../service/workout';
import useInterval from '../../hooks/useInterval';
import Notification from '../Notification';
import useNotifiction from '../../hooks/useNotification';
import useAddRoutine from '../../hooks/useAddRoutine';
import { secondsToHms } from '../../utils/timedate';
import { stringToHmsFormat } from '../../utils/timedate';


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
    const testRoutine = { // remove this later
      name: routineName,
      duration: count,
      exercises: finishedExercises
    };
    console.log("testRoutine" + JSON.stringify(testRoutine)); // remove this later

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
    // todo add
    // weigthed
    // add kg to handleChange

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

      default: //timed
        value = value.replace(":", "");
        value = value.replace(/^0+/, ''); // removing leading zeroes
        if (Number(value) > 0) {
          updatedExercises[exerciseIndex].sets[setIndex].validInput = true;
        } else {
          updatedExercises[exerciseIndex].sets[setIndex].validInput = false;
          updatedExercises[exerciseIndex].sets[setIndex].done = false;
        }
        updatedExercises[exerciseIndex].sets[setIndex].time = stringToHmsFormat(value);
        break;
    }

    setExercises(updatedExercises);
  };

  const handleExerciseSetDone = ({ checkboxValue, setIndex, exerciseIndex }) => {
    const updatedExercises = [...exercises];
    updatedExercises[exerciseIndex].sets[setIndex].done = checkboxValue;
    setExercises(updatedExercises);
  };


  const renderExerciseCard = (exercise, exerciseIndex) => {
    switch (exercise.type) {
      case "timed":
        return (
          <TimedExerciseCard
            key={`exercise-${exerciseIndex}`}
            exercise={exercise}
            exerciseIndex={exerciseIndex}
            handleChange={handleChange}
            handleExerciseSetDone={handleExerciseSetDone}
            addSet={addSet}
          />);
      default:
        return (
          <RepsExerciseCard
            key={`exercise-${exerciseIndex}`}
            exercise={exercise}
            exerciseIndex={exerciseIndex}
            handleChange={handleChange}
            handleExerciseSetDone={handleExerciseSetDone}
            addSet={addSet}
          />);
    }
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
            renderExerciseCard(exercise, exerciseIndex)
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