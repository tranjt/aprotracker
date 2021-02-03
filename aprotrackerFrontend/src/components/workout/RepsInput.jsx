import React, { useState } from 'react';
import { TextInput, Text, View, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';


const RepsInput = ({ set, setIndex, exerciseIndex, handleChange }) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.setNumber}>{setIndex + 1}</Text>
      <Text style={styles.previous}>-</Text>
      <TextInput
        placeholder='5'
        style={styles.repsInput}
        onChangeText={value => handleChange({ value, setIndex, exerciseIndex })}
        value={set.reps}
        keyboardType="number-pad"
      />
      <CheckBox
        disabled={false}
        value={toggleCheckBox}
        onValueChange={(newValue) => setToggleCheckBox(newValue)}
      />
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    alignSelf: 'center'
  },
  setNumber: {
    marginLeft: 10,
    flexGrow: 0,
    alignSelf: 'center',
    width: 25,
    textAlign: "center",
  },
  previous: {
    marginLeft: 10,
    flexGrow: 0,
    alignSelf: 'center',
    width: 65,
    textAlign: "center",
  },
  repsInput: {
    backgroundColor: "#d3d3d3",
    borderRadius: 4,
    marginLeft: 10,
    textAlign: "center",
    flexGrow: 1,

  },
  checkbox: {
  },
});

export default RepsInput;