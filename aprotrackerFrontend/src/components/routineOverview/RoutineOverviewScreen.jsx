
import React from 'react';
import { Text, Button, View, StyleSheet } from 'react-native';
import workoutService from '../../service/workout';


const RoutineOverviewScreen = ({ navigation, route }) => {
  const { routineName, routineIndex } = route.params;
  const { exercises } = workoutService.getRoutine(routineIndex);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{routineName}</Text>
      <View style={styles.execisesContainer} >
        {exercises.map((execise, idx) => {
          return (
            <View
              key={`execise-${idx}`}
              style={styles.execiseContainer}
            >
              <Text style={styles.text}>
                {`${execise.sets.setCount} x ${execise.name} `}
              </Text>
              <Text style={styles.infoText}>
                {/* todo modal info about execise */}
                Info!
              </Text>
            </View>
          );
        })}
      </View>
      <Button
        onPress={() => navigation.navigate('DoRoutine', {
          routineIndex
        })}
        title="Do routine"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  execisesContainer: {
    paddingBottom: 30
  },
  execiseContainer: {
    flexDirection: "row",
    paddingTop: 15,
  },
  infoText: {
    marginLeft: "auto",
    fontWeight: "bold",
    paddingRight: 10
  },
  text: {
    color: "#7e7e7e"
  },
});


export default RoutineOverviewScreen;
