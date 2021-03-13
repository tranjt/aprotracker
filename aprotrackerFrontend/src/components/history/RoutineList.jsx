import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ExerciseList from './ExerciseList';
import { dateFormat, secondsToHmsV2 } from '../../utils/timedate';
import theme from '../../theme';


const RoutineList = ({ routines }) => {

  if (routines.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.empty}>No routine done</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {
            routines.map((routine, routineIndex) => {
              return (
                <View key={`routine-${routineIndex}`} style={styles.routineContainer}>
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
                  {routines.length - 1 > routineIndex ? (<View style={styles.divider} />) : null}
                </View>
              );
            })
          }
        </ScrollView>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e8eaf6',
    paddingHorizontal: 5,
    paddingTop: 5,
    flex: 1
  },
  card: {
    borderRadius: 6,
    elevation: 1,
    backgroundColor: '#fff',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginTop: 5,
    marginBottom: 10,
    padding: 10,
  },
  divider: {
    height: 2,
    backgroundColor: '#e8eaf6',
    alignSelf: 'stretch',
    marginVertical: 20
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
  emptyContainer: {
    backgroundColor: '#e8eaf6',
    paddingHorizontal: 5,
    paddingTop: 5,
    flex: 1
  },
  empty: {
    backgroundColor: '#fff',
    padding: 5,
    margin: 'auto',
    flex: 1,
    borderRadius: 6,
  },
});

export default RoutineList;