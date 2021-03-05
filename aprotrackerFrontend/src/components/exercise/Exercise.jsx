import React from 'react';
import { Text, View, StyleSheet, } from 'react-native';


const Exercise = ({ exercise }) => {
  return (
    <View>
      <Text        
        style={styles.text}
      >
        {`${exercise.sets.setCount} x ${exercise.name}  (${exercise.type})`}
      </Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    alignSelf: 'center'
  },
  text: {
    color: '#7e7e7e'
  },
  separator: {
    height: 10,
  },
});


export default Exercise;