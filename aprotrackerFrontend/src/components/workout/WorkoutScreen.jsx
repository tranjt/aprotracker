import React from 'react';
import { View, Text, Button } from 'react-native';

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
          sets: { setCount: 3, repsPlaceholder: 5 }
        },
        {
          name: 'Squats',
          type: 'repsOnly',
          sets: { setCount: 3, repsPlaceholder: 5 }
        },
        {
          name: 'Dips',
          type: 'repsOnly',
          sets: { setCount: 3, repsPlaceholder: 5 }
        },
        {
          name: 'Hinge',
          type: 'repsOnly',
          sets: { setCount: 3, repsPlaceholder: 5 }
        },
        {
          name: 'Row',
          type: 'repsOnly',
          sets: { setCount: 3, repsPlaceholder: 5 }
        },
        {
          name: 'Push-up',
          type: 'repsOnly',
          sets: { setCount: 3, repsPlaceholder: 5 }
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
          sets: { setCount: 3, repsPlaceholder: 5 }
        },
        {
          name: 'Assisted Squat',
          type: 'repsOnly',
          sets: { setCount: 3, repsPlaceholder: 5 }
        },
        {
          name: 'Parallel Bar Support Hold',
          type: 'repsOnly',
          sets: [{ setCount: 3, repsPlaceholder: 5 }]
        },
        {
          name: 'Romanian Deadlift Hinge',
          type: 'repsOnly',
          sets: { setCount: 3, repsPlaceholder: 5 }
        },
        {
          name: 'Vertical Rows',
          type: 'repsOnly',
          sets: { setCount: 3, repsPlaceholder: 5 }
        },
        {
          name: 'Vertical Pushup',
          type: 'repsOnly',
          sets: { setCount: 3, repsPlaceholder: 5 }
        },
      ],
    },
  ];

  // {
  //   name: 'Pull-up',
  //   type: 'repsOnly',
  //   sets: { setCount: 3, reps: 5 }
  // }

  // const testgeneration = {
  //   name: 'recommended routine',
  //   componentType: 'routine',
  //   exercises: [
  //     {
  //       name: 'Pull-up',
  //       type: 'repsOnly',
  //       sets: [
  //         { setNumber: 1, reps: 0, repsPlaceholder: 5 },
  //         { setNumber: 2, reps: 0, repsPlaceholder: 5 },
  //         { setNumber: 3, reps: 0, repsPlaceholder: 5 }
  //       ]
  //     },
  //     {
  //       name: 'Squats',
  //       type: 'repsOnly',
  //       sets: [
  //         { setNumber: 1, reps: 0, repsPlaceholder: 5 },
  //         { setNumber: 2, reps: 0, repsPlaceholder: 5 },
  //         { setNumber: 3, reps: 0, repsPlaceholder: 5 }
  //       ]
  //     }
  //   ]
  // };

  const generateRoutineComponentObject = (routine) => {

    const buildTrainingSets = ({ type, sets }) => {
      switch (type) {
        case 'repsOnly':
          return Array.from(Array(sets.setCount),
            (x, index) => {
              return {
                setNumber: index + 1,
                reps: 0,
                repsPlaceholder: sets.repsPlaceholder
              };
            });
        case 'weighted':
          return Array.from(Array(sets.setCount),
            (x, index) => {
              return {
                setNumber: index + 1,
                kg: 0,
                reps: 0,
                repsPlaceholder: sets.repsPlaceholder
              };
            });
        case 'timed':
          return Array.from(Array(sets.setCount),
            (x, index) => {
              return {
                setNumber: index + 1,
                time: 0
              };
            });
        default:
          console.log('traning type not supported');
      }
    };

    return {
      name: routine.name,
      exercises:
        routine.exercises.map(exercise => {
          if (exercise.type === 'Warmup') {
            return {
              name: exercise.name,
              type: exercise.type,
              sets: [
                { setNumber: 1, reps: 0, repsPlaceholder: 5 },
                { setNumber: 2, reps: 0, repsPlaceholder: 5 },
                { setNumber: 3, reps: 0, repsPlaceholder: 5 }
              ]
            };
          }
          return {
            name: exercise.name,
            type: exercise.type,
            sets: buildTrainingSets(exercise)
          };
        })
    };
  };


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Workout Screen</Text>
      <Button
        onPress={() => navigation.navigate('RoutineOverview')}
        title="Open routine overview screen (select a routine)"
      />
      <Text>{JSON.stringify(generateRoutineComponentObject(routines[0]))}</Text>
    </View>
  );
};

export default WorkoutScreen;