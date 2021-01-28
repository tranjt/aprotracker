import React from 'react';

const WorkoutScreen = ({ navigation }) => {

  const routines = [
    {
      name: 'recommended routine',
      exercises: [
        {
          name: 'Warmup',
          type: 'warmup',
          sets: {}
        },
        {
          name: 'Pull-up',
          type: 'repsOnly',
          sets: {setNumber: 3, reps: 5}
        },
        {
          name: 'Squats',
          type: 'repsOnly',
          sets: {setNumber: 3, reps: 5}
        },
        {
          name: 'Dips',
          type: 'repsOnly',
          sets: {setNumber: 3, reps: 5}
        },
        {
          name: 'Hinge',
          type: 'repsOnly',
          sets: {setNumber: 3, reps: 5}
        },        
        {
          name: 'Row',
          type: 'repsOnly',
          sets: {setNumber: 3, reps: 5}
        },
        {
          name: 'Push-up',
          type: 'repsOnly',
          sets: {setNumber: 3, reps: 5}
        },
      ],
    },
    {
      name: 'recommended routine beginner',
      exercises: [
        {
          name: 'Warmup',
          type: 'warmup',
          sets: {}
        },
        {
          name: 'Pull-up Negatives',
          type: 'repsOnly',
          sets: {setNumber: 3, reps: 5}
        },
        {
          name: 'Assisted Squat',
          type: 'repsOnly',
          sets: {setNumber: 3, reps: 5}
        },
        {
          name: 'Parallel Bar Support Hold',
          type: 'repsOnly',
          sets: [{setNumber: 3, reps: 5}]
        },
        {
          name: 'Romanian Deadlift Hinge',
          type: 'repsOnly',
          sets: {setNumber: 3, reps: 5}
        },        
        {
          name: 'Vertical Rows',
          type: 'repsOnly',
          sets: {setNumber: 3, reps: 5}
        },
        {
          name: 'Vertical Pushup',
          type: 'repsOnly',
          sets: {setNumber: 3, reps: 5}
        },
      ],
    },
  ];



  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Workout Screen</Text>
      <Button
        onPress={() => navigation.navigate('RoutineOverview')}
        title="Open routine overview screen (select a routine)"
      />
    </View>
  );
}

export default WorkoutScreen;