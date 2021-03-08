import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import RoundPlusButton from '../RoundPlusButton';

import Exercise from './Exercise';


const ExerciseList = ({ createExercise, exercises }) => {  
  return (
    <View style={styles.container}>
      <FlatList
        data={exercises}
        renderItem={({ item, index }) => <Exercise exercise={item} exerciseIndex={index}/>}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item, index) => `$exercises-${index}`}
        contentContainerStyle={{ paddingBottom: 45 }}
      />
      <RoundPlusButton
        size={40}
        color='black'
        onPress={createExercise}
      />
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#ebecf0',
    padding: 5
  },
  text: {
    color: '#7e7e7e'
  },
  separator: {
    height: 2,
  },
});


export default ExerciseList;