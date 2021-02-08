import React from "react";
import { TextInput, Text, View, StyleSheet } from "react-native";
import CheckBox from "@react-native-community/checkbox";


const RepsInput = ({ set, setIndex, exerciseIndex, handleChange, handleExerciseSetDone }) => {

  const repsInputContainerStyle = [
    styles.container,
    set.done && styles.containerDone
  ];

  const repsTextInputStyle = [
    styles.textInput,
    set.done && styles.textInputDone
  ];

  return (
    <View style={repsInputContainerStyle}>
      <Text style={styles.setNumber}>{setIndex + 1}</Text>
      <Text style={styles.previous}>-</Text>
      <TextInput
        placeholder="5"
        style={repsTextInputStyle}
        onChangeText={value => handleChange({ value, setIndex, exerciseIndex })}
        value={set.reps}
        keyboardType="number-pad"
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
    flexDirection: "row",
    padding: 10,
    alignSelf: "center"
  },
  containerDone: {
    backgroundColor: "#D0F0C0"
  },
  setNumber: {
    marginLeft: 10,
    flexGrow: 0,
    alignSelf: "center",
    width: 25,
    textAlign: "center",
  },
  previous: {
    marginLeft: 10,
    flexGrow: 0,
    alignSelf: "center",
    width: 65,
    textAlign: "center",
  },
  textInput: {
    backgroundColor: "#dfdfdf",
    borderRadius: 4,
    marginLeft: 10,
    textAlign: "center",
    flexGrow: 1,
  },
  textInputDone: {
    backgroundColor: "#D0F0C0",
    fontWeight: "bold"
  },
  checkbox: {
  },
});

export default RepsInput;