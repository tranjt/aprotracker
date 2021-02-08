import React from 'react';
import { View, Pressable, StyleSheet, ScrollView } from 'react-native';
import Text from '../Text';

import workoutService from '../../service/workout';
import ExerciseList from './ExerciseList';
//import theme from '../../theme';


const RoutineOptions = ({ navigation }) => {
  const routines = workoutService.getRoutines();  

  return (
    <ScrollView >
      {
        routines.map((routine, key) => {
          return (
            <View key={`routine-${key}`} style={styles.card}>
              <Pressable
               onPress={() => navigation.navigate('RoutineOverview', {
                 routineName: routine.name
               })}
              >
                <Text
                  fontWeight="bold"
                  fontSize="subheading"
                  style={styles.subheadingStyle}

                >{routine.name}</Text>
                <ExerciseList execises={routine.exercises} />
              </Pressable>
            </View>
          );
        })
      }
    </ScrollView>
  );

};

const styles = StyleSheet.create({
  card: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: "#fff",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 5,
    padding: 10,
  }, 
  subheadingStyle: {
    color: "#0e1111",
    paddingBottom: 4,
  }
});

export default RoutineOptions;