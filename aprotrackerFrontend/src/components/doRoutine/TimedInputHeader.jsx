import React from 'react';
import {  Text, View, StyleSheet } from 'react-native';


 const TimedInputHeader = () => {  
  return (
    <View style={styles.container}>
      <Text style={styles.setNumber}>SET</Text>
      <Text style={styles.previous}>PREVIOUS</Text>
      <Text style={styles.timedInput}>TIME</Text>     
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    alignSelf: 'center'
  },
  setNumber: {
    marginLeft: 10,
    flexGrow: 0,
    alignSelf: 'center',
    width: 25,
    fontSize: 12,
    fontWeight: 'bold'
  },
  previous: {
    marginLeft: 10,
    flexGrow: 0,
    alignSelf: 'center',
    width: 65,
    fontSize: 12,
    fontWeight: 'bold'
  },
  timedInput: {
    borderRadius: 4,
    marginLeft: 10,
    textAlign: 'center',
    flexGrow: 1,
    fontSize: 12,
    fontWeight: 'bold', 
    marginRight: 26   
  },
  checkbox: {
    width: 26
  },
});

export default TimedInputHeader;