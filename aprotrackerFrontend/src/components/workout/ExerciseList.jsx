import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const ExerciseList = ({ execises }) => {  

  return (
    <View>
      {
        execises.map((execise, key) => {
          return (
            <Text key={`execise-${key}`} style={styles.text}>
              {`${execise.sets.setCount} x ${execise.name}  (${execise.type})`}
            </Text>
          );
        })
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    alignSelf: "center"
  },
  text: {
    color: "#7e7e7e"
  }
});

export default ExerciseList;