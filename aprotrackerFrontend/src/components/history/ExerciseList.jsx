import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const ExerciseList = ({ execises }) => {
  return (
    <View>
      <Text
        fontWeight='bold'
        fontSize='subheading'
        style={styles.subheadingStyle}
      >
        Exercises
      </Text>
      {
        execises.map((execise, key) => {
          return (
            <Text
              key={`execise-${key}`}
              style={styles.text}
            >
              {`${execise.sets.length} x ${execise.name}  (${execise.type})`}
            </Text>
          );
        })
      }
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
  subheadingStyle: {
    color: '#0e1111',
    paddingBottom: 4,
    fontWeight: 'bold'

  },
});

export default ExerciseList;