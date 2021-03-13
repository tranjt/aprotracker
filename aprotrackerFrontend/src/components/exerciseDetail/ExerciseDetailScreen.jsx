import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalData } from '../../state/localDataContext';
import exerciseService from '../../service/exercise';

import theme from '../../theme';

const ExerciseDetailScreen = ({ navigation, route }) => {
  const [exercise, setExercise] = useState();
  const [state, dispatch] = useLocalData();
  const { exerciseIndex } = route.params;

  useEffect(() => {
    setExercise(state.exercises[exerciseIndex]);
  }, []);

  const doDelete = async () => {
    try {
      await exerciseService.deleteExercise(exercise.name);
      dispatch({ type: 'DELETE_EXERCISE', exerciseName: exercise.name });
      navigation.navigate('Home', { screen: 'Exercise' });

    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = () => {
    Alert.alert(
      'Are you sure you want to delete?',
      'Existing routine with this exercise might not be useable after deletion!',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'Delete exercise', onPress: () => doDelete() }
      ],
      { cancelable: false }
    );
  };

  const renderDeleteButton = () => {
    return (
      <TouchableOpacity
        onPress={onDelete}
        style={styles.deleteButton}
      >
        <MaterialIcons name="delete-forever" size={30} color="black" />
      </TouchableOpacity>
    );
  };

  if (!exercise) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{exercise.name}</Text>
      </View>
      {exercise.editable ? renderDeleteButton() : null}
      {exercise?.description ?
        <Text style={styles.description}>
          {exercise?.description}
        </Text>
        : <Text style={styles.description}>
           No description available!
      </Text>
      }

    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center'
  },
  title: {
    marginTop: 10,
    paddingBottom: 15,
    color: 'black',
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.title
  },
  deleteButton: {
    position: 'absolute',
    bottom: 10,
    right: 15,
  },
  description: {
    paddingLeft: 10
  }
});

export default ExerciseDetailScreen;