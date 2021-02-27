import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Text from '../Text';
import ExerciseList from './ExerciseList';
import { dateFormat } from '../../utils/timedate';
import theme from '../../theme';


const RoutineList = ({ routines }) => {

  return (
    <ScrollView >
      {
        routines.map((routine, routineIndex) => {          
          return (
            <View key={`routine-${routineIndex}`} style={styles.card}>
              <Text
                fontWeight="bold"
                fontSize="subheading"
                style={styles.title}
              >
                {routine.name}
              </Text>
              <Text
                style={styles.date}
              > completed:             
                {dateFormat(routine.createdAt)}
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
  },
  date: {
    color: theme.colors.smallerText,
    marginBottom: 10,
    fontSize: theme.fontSizes.smallerText
  }
});

export default RoutineList;