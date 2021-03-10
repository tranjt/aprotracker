import React, { useState, useEffect } from 'react';
import { ScrollView, Text, Button as OgButton, View, StyleSheet, Alert, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { Entypo } from '@expo/vector-icons';

import RepsExerciseCard from './RepsExerciseCard';
import TimedExerciseCard from './TimedExerciseCard';
import WeightedExerciseCard from './WeightedExerciseCard';
import workoutService from '../../service/workout';
import Timer from './Timer';
import useInterval from '../../hooks/useInterval';
import Notification from '../Notification';
import useNotifiction from '../../hooks/useNotification';
import useAddRoutine from '../../hooks/useAddRoutine';
import { useLocalData } from '../../state/localDataContext';
import { secondsToHms } from '../../utils/timedate';
import { stringToHmsFormat } from '../../utils/timedate';
import { secondsToHmsV2 } from '../../utils/timedate';
import { stringToSeconds } from '../../utils/timedate';
import Button from '../Button';
import theme from '../../theme';


const DoRoutineScreen = ({ navigation, route }) => {
  const [routineName, setRoutineName] = useState('');
  const [exercises, setExercises] = useState([]);
  const [count, setCount] = useState(0);
  const [notification, setNotifiction] = useNotifiction();
  const { routineIndex } = route.params;
  const [addRoutine] = useAddRoutine();
  const [state] = useLocalData();
  const [timerVisible, setTimerVisible] = useState(false);
  const [timer, setTimer] = useState('00:45');
  const [timerActive, setTimerActive] = useState(false);


  useEffect(() => {
    const routine = workoutService.generateRoutineComponentObject(state.routines[routineIndex]);
    setRoutineName(routine.name);
    setExercises([...routine.exercises]);

  }, [routineIndex]);

  useInterval(() => {
    setCount(count + 1);

    if (stringToSeconds(timer) <= 1) {
      setTimerActive(false);
    }
    if (timerActive) {
      const timerInSeconds = stringToSeconds(timer);
      const timerInString = secondsToHmsV2(timerInSeconds - 1);

      setTimer(timerInString);
    }
  }, 1000);

  const handleTimerChange = (value) => {
    value = value.replace(/:/g, '');
    value = value.replace(/^0+/, '');
    let timestring = stringToHmsFormat(value);
    if (!timestring) {
      timestring = '00:00';
    }

    setTimer(timestring);
  };


  const handleSubmit = async (finishedExercises) => {
    const testRoutine = { // remove this later
      name: routineName,
      duration: count,
      exercises: finishedExercises
    };
    console.log('testRoutine' + JSON.stringify(testRoutine)); // remove this later

    try {
      await addRoutine({
        name: routineName,
        duration: count,
        exercises: finishedExercises
      });
      navigation.navigate('History');
    } catch (error) {
      console.log(error);
    }
  };

  const routineFinished = (doneExercises) => {
    const parsedExercises = workoutService.parseDoneExercises(doneExercises);

    if (parsedExercises.length === 0) {
      setNotifiction('Some sets must be completed to finish routine!');
    }
    else {
      Alert.alert(
        'Are you finished?',
        'All empty or none checked sets will be discarded!',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          },
          { text: 'Finish workout', onPress: () => handleSubmit(parsedExercises) }
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

  const changeSetValue = ({ value, setIndex, exerciseIndex, type, validInput, updatedExercises }) => {
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
      case 'repsOnly':
        changeSetValue({
          value,
          setIndex,
          exerciseIndex,
          type: 'reps',
          validInput: (Number(value) > 0),
          updatedExercises
        });
        break;
      case 'weighted':
        if (kgInputField) { //kg input field
          const respValue = Number(updatedExercises[exerciseIndex].sets[setIndex].reps);
          changeSetValue({
            value,
            setIndex,
            exerciseIndex,
            type: 'kg',
            validInput: (Number(value) > 0 && respValue), // make sure kg and reps field are valid
            updatedExercises
          });
        }
        else { // reps input field
          const kgValue = Number(updatedExercises[exerciseIndex].sets[setIndex].kg);
          changeSetValue({
            value,
            setIndex,
            exerciseIndex,
            type: 'reps',
            validInput: (Number(value) > 0 && kgValue), // make sure kg and reps field are valid
            updatedExercises
          });
        }
        break;
      default: //timed
        value = value.replace(/:/g, '');
        value = value.replace(/^0+/, ''); // removing leading zeroes
        changeSetValue({
          value: stringToHmsFormat(value),
          setIndex,
          exerciseIndex,
          type: 'time',
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
      case 'timed':
        return (
          <TimedExerciseCard
            key={`exercise-${exerciseIndex}`}
            exercise={exercise}
            exerciseIndex={exerciseIndex}
            handleChange={handleChange}
            handleExerciseSetDone={handleExerciseSetDone}
            addSet={addSet}
          />);
      case 'weighted':
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

      <View style={styles.header}>
        <Text>{secondsToHms(count)}</Text>
        <OgButton onPress={() => routineFinished(exercises)} title='Finished' />
        <Pressable
          onPress={() => setTimerVisible(true)}
        >
          <Entypo name="stopwatch" size={36} color="black" />
        </Pressable>

      </View>
      <View style={styles.body}>
        <Notification notification={notification} />
        <ScrollView >
          <Text style={styles.title}>{routineName}</Text>
          {
            exercises.map((exercise, exerciseIndex) => (
              renderExerciseCard(exercise, exerciseIndex)
            ))
          }

          <Button
            onPress={() => navigation.navigate('Workout')}
            title='Cancel workout!'
            titleStyle={{ color: 'tomato' }}
            style={styles.buttonCancel}
          />
        </ScrollView>
        <Timer
          modalVisible={timerVisible}
          setModalVisible={setTimerVisible}
          timer={timer}
          setTimerActive={setTimerActive}
          handleTimerChange={handleTimerChange}
        />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10
  },
  body: {
    backgroundColor: '#e8eaf6',
    padding: 10,
    flex: 1
  },
  title: {
    paddingLeft: 5,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading
  },
  buttonCancel: {
    marginTop: 10,
    marginHorizontal: 5
  }

});

export default DoRoutineScreen;