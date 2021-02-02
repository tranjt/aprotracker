import React, { useState } from 'react';
import { TextInput, Text, View, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const RepsInput = () => {

  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={styles.setNumber}>set</Text>
      <Text style={styles.previous}>no</Text>
      <TextInput
        placeholder='5'
        style={styles.repsInput}
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
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10
  },
  setNumber: {
    marginLeft: 10
  },
  previous: {
    marginLeft: 10
  },
  repsInput: {
    backgroundColor: "#d3d3d3",
    flex: 1,
    borderRadius: 4,
    marginLeft: 10,
    textAlign: "center"
  },
  checkbox: {    
    
  },


});

export default RepsInput;