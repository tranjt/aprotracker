import React from 'react';
import { View, Pressable, StyleSheet, ScrollView, Text, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { useLocalData } from '../../state/localDataContext';
import routineService from '../../service/routine';
import ExerciseList from './ExerciseList';
import useRoutines from '../../hooks/useRoutines';
import { dateFormat } from '../../utils/timedate';
import RoundButton from '../RoundButton';
import theme from '../../theme';


const RoutineOptions = ({ navigation }) => {
  const [state, dispatch] = useLocalData();
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

  const doDelete = async (routineName) => {
    try {
      await routineService.deleteRoutine(routineName);
      dispatch({ type: 'DELETE_ROUTINE', routineName });

    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = (routineName) => {
    Alert.alert(
      'Are you sure you want to delete?',
      'This custom routine will be gone forever!',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'Delete routine', onPress: () => doDelete(routineName) }
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 45 }}
      >
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
                {
                  routine.editable ?
                    (<Pressable
                      onPress={() => onDelete(routine.name)}
                      style={styles.deleteButton}
                    >
                      <MaterialIcons name="delete-forever" size={24} color="black" />
                    </Pressable>)
                    : null
                }
              </View>
            );
          })
        }
      </ScrollView>
      <RoundButton
        size={40}
        name='plus'
        color='black'
        onPress={createRoutine}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e8eaf6',
    padding: 10,
  },
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
    justifyContent: 'space-between',
    flexDirection: 'row'

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