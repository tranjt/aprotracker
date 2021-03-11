import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ExerciseList from './ExerciseList';
import { dateFormat, secondsToHmsV2 } from '../../utils/timedate';
import theme from '../../theme';


const RoutineList = ({ routines }) => {
  return (
    <ScrollView >
      {
        routines.map((routine, routineIndex) => {
          return (
            <View key={`routine-${routineIndex}`} style={styles.card}>
              <Text
                style={styles.title}
              >
                {routine.name}
              </Text>
              <Text
                style={styles.date}
              >
                {`completed: ${dateFormat(routine.createdAt)}`}
              </Text>
              <Text
                style={styles.date}
              >
                <MaterialCommunityIcons name="clock-outline" size={13} color={theme.colors.smallerText} />
                {` ${secondsToHmsV2(routine.duration)}`}
              </Text>
              <ExerciseList execises={routine.exercises} />

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
    backgroundColor: '#fff',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 5,
    padding: 10,
  },
  subheadingStyle: {
    color: '#0e1111',
    paddingBottom: 4,
  },
  date: {
    color: theme.colors.smallerText,
    marginBottom: 5,
    fontSize: theme.fontSizes.smallerText
  },
  title: {
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading
  },
});

export default RoutineList;