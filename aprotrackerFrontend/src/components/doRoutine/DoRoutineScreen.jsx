import React, { useState, useEffect } from 'react';
import { ScrollView, Text, Button as OgButton, View, StyleSheet, Alert } from 'react-native';
import Constants from 'expo-constants';

import RepsExerciseCard from './RepsExerciseCard';
import TimedExerciseCard from './TimedExerciseCard';
import WeightedExerciseCard from './WeightedExerciseCard';
import workoutService from '../../service/workout';
import useInterval from '../../hooks/useInterval';
import Notification from '../Notification';
import useNotifiction from '../../hooks/useNotification';
import useAddRoutine from '../../hooks/useAddRoutine';
import { secondsToHms } from '../../utils/timedate';
import { stringToHmsFormat } from '../../utils/timedate';
import Button from '../Button';


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

  const changeValue = ({ value, setIndex, exerciseIndex, type, validInput, updatedExercises }) => {
    if (validInput) {
      updatedExercises[exerciseIndex].sets[setIndex].validInput = true;
    } else {
      updatedExercises[exerciseIndex].sets[setIndex].validInput = false;
      updatedExercises[exerciseIndex].sets[setIndex].done = false;
    }
    updatedExercises[exerciseIndex].sets[setIndex][type] = value;
  };

  const handleChange = ({ value, setIndex, exerciseIndex, exerciseType, kgInputField }) => {
    const updatedExercises = [...exercises];

    switch (exerciseType) {
      case "repsOnly":
        changeValue({
          value,
          setIndex,
          exerciseIndex,
          type: "reps",
          validInput: (Number(value) > 0),
          updatedExercises
        });
        break;
      case "weighted":
        if (kgInputField) { //kg input field
          const respValue = Number(updatedExercises[exerciseIndex].sets[setIndex].reps);
          changeValue({
            value,
            setIndex,
            exerciseIndex,
            type: "kg",
            validInput: (Number(value) > 0 && respValue),
            updatedExercises
          });
        }
        else { // reps input field
          const kgValue = Number(updatedExercises[exerciseIndex].sets[setIndex].kg);
          changeValue({
            value,
            setIndex,
            exerciseIndex,
            type: "reps",
            validInput: (Number(value) > 0 && kgValue),
            updatedExercises
          });
        }
        break;

      default: //timed
        value = value.replace(":", "");
        value = value.replace(/^0+/, ''); // removing leading zeroes
        changeValue({
          value: stringToHmsFormat(value),
          setIndex,
          exerciseIndex,
          type: "time",
          validInput: (Number(value) > 0),
          updatedExercises
        });
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
      case "weighted":
        return (
          <WeightedExerciseCard
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
        <OgButton onPress={() => routineFinished(exercises)} title="Finished" />
      </View>
      <Notification notification={notifcation} />
      <ScrollView >
        <Text>{routineName}</Text>
        {
          exercises.map((exercise, exerciseIndex) => (
            renderExerciseCard(exercise, exerciseIndex)
          ))
        }
        <Button
          onPress={() => navigation.navigate('Workout')}
          title="Cancel workout!"
          titleStyle={{ color: "tomato" }}
        />
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