import React from 'react';
import { View, Pressable, StyleSheet, ScrollView } from 'react-native';
import Text from '../Text';

import workoutService from '../../service/workout';
import ExerciseList from './ExerciseList';
import useRoutines from '../../hooks/useRoutines';
import { dateFormat } from '../../utils/timedate';
import theme from '../../theme';



const RoutineOptions = ({ navigation }) => {
  const routinesTemplates = workoutService.getRoutines();
  const { routines } = useRoutines();

  const renderLatestCompletedRoutine = (name) => {
    const routine = routines?.find(routine => routine.name === name);
    if (routine) {
      return (
        <Text style={styles.date}>
          last completed:
          {dateFormat(routine.createdAt)}
        </Text>
      );
    }
    return null;
  };


  return (
    <ScrollView >
      {
        routinesTemplates.map((routineTemplate, routineIndex) => {
          return (
            <View key={`routine-${routineIndex}`} style={styles.card}>
              <Pressable
                onPress={() => navigation.navigate('RoutineOverview', {
                  routineName: routineTemplate.name,
                  routineIndex
                })}
              >
                <Text
                  fontWeight="bold"
                  fontSize="subheading"
                  style={styles.subheadingStyle}
                >
                  {routineTemplate.name}
                </Text>
                {renderLatestCompletedRoutine(routineTemplate.name)}
                <ExerciseList execises={routineTemplate.exercises} />
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
  },
  date: {
    color: theme.colors.smallerText,
    marginBottom: 10,
    fontSize: theme.fontSizes.smallerText
  }
});

export default RoutineOptions;