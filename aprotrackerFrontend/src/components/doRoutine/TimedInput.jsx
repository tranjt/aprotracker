import React from 'react';
import { TextInput, Text, View, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import usePreviousStats from '../../hooks/usePreviousStats';
import theme from '../../theme';


const TimedInput = ({ set, setIndex, exerciseIndex, handleChange, handleExerciseSetDone, exercise }) => {
  const { latestCompletedExercises } = usePreviousStats();

  const repsInputContainerStyle = [
    styles.container,
    set.done && styles.containerDone
  ];

  const repsTextInputStyle = [
    styles.textInput,
    set.done && styles.textInputDone
  ];

  const renderPreviousCompleted = (name) => {
    const previousExercise = latestCompletedExercises.find(prevEx => prevEx.name === name);
    const prevTime = previousExercise?.sets[setIndex]?.time;

    if (prevTime) {
      return (
        <Text style={styles.previous}>
          {prevTime}
        </Text>
      );
    }
    return (<Text style={styles.previous}>-</Text>);
  };

  return (
    <View style={repsInputContainerStyle}>
      <Text style={styles.setNumber}>{setIndex + 1}</Text>
      {renderPreviousCompleted(exercise.name)}
      <TextInput

        placeholder={set.timedPlaceholder}
        style={repsTextInputStyle}
        onChangeText={value => handleChange({ value, setIndex, exerciseIndex, exerciseType: exercise.type })}
        value={set.time}
        keyboardType='number-pad'
        selectTextOnFocus
      />
      <CheckBox
        disabled={!set.validInput}
        value={set.done}
        onValueChange={checkboxValue => handleExerciseSetDone({ checkboxValue, setIndex, exerciseIndex })}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    alignSelf: 'center'
  },
  containerDone: {
    backgroundColor: theme.colors.primaryLight
  },
  setNumber: {
    marginLeft: 10,
    flexGrow: 0,
    alignSelf: 'center',
    width: 25,
    textAlign: 'center',
    color: '#009faf'
  },
  previous: {
    marginLeft: 10,
    flexGrow: 0,
    alignSelf: 'center',
    width: 65,
    textAlign: 'center',
    color: '#a9a9a9'
  },
  textInput: {
    backgroundColor: '#dfdfdf',
    borderRadius: 4,
    marginLeft: 10,
    textAlign: 'center',
    flexGrow: 1,
  },
  textInputDone: {
    backgroundColor: theme.colors.primaryLight,
    fontWeight: theme.fontWeights.bold
  },
  checkbox: {
  },
});

export default TimedInput;