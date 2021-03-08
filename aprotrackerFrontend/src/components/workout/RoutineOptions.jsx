import React from 'react';
import { View, Pressable, StyleSheet, ScrollView, Text } from 'react-native';

import { useLocalData } from '../../state/localDataContext';
import ExerciseList from './ExerciseList';
import useRoutines from '../../hooks/useRoutines';
import { dateFormat } from '../../utils/timedate';
import RoundPlusButton from '../RoundPlusButton';
import theme from '../../theme';


const RoutineOptions = ({ navigation }) => {
  const [state] = useLocalData();
  const { completedRoutines } = useRoutines();

  const createRoutine = () => {
    navigation.navigate('CreateRoutine');
  };

  const renderLatestCompletedRoutine = (name) => {
    const completedRoutine = completedRoutines?.find(routine => routine.name === name);
    if (completedRoutine) {
      return (
        <Text style={styles.date}>
          last completed:
          {dateFormat(completedRoutine.createdAt)}
        </Text>
      );
    }
    return null;
  };

  return (
    <View>
      <ScrollView >
        {
          state.routines.map((routine, routineIndex) => {
            return (
              <View key={`routine-${routineIndex}`} style={styles.card}>
                <Pressable
                  onPress={() => navigation.navigate('RoutineOverview', {
                    routineName: routine.name,
                    routineIndex
                  })}
                >
                  <Text
                    style={styles.subheadingStyle}
                  >
                    {routine.name}
                  </Text>
                  {renderLatestCompletedRoutine(routine.name)}
                  <ExerciseList exercises={routine.exercises} />
                </Pressable>
              </View>
            );
          })
        }
      </ScrollView>
      <RoundPlusButton
        size={40}
        color='black'
        onPress={createRoutine}
      />
    </View>
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
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading
  },
  date: {
    color: theme.colors.smallerText,
    marginBottom: 10,
    fontSize: theme.fontSizes.smallerText
  }
});

export default RoutineOptions;