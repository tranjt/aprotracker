import React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WorkoutScreen from './workout/WorkoutScreen';
import DoRoutineScreen from './workout/DoRoutineScreen';

function ProfileScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>This is the profile screen!</Text>
    </View>
  );
}

function HistoryScreen({ route }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>This is the History screen!</Text>
      <Text>{route.params?.someParam}</Text>
    </View>
  );
}

function ExerciseScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Exercise</Text>
    </View>
  );
}

function RoutineOverviewScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>This is a routine overview screen!</Text>
      <Button onPress={() => navigation.navigate('DoRoutine')} title="Do Routine" />
    </View>
  );
}


const RootStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Workout" component={WorkoutScreen} />
      <Tab.Screen name="Exercise" component={ExerciseScreen} />
    </Tab.Navigator>
  );
}

function Main() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="Home" options={{ headerShown: false }} component={Home} />
        <RootStack.Screen name="RoutineOverview" component={RoutineOverviewScreen} />
        <RootStack.Screen name="DoRoutine" component={DoRoutineScreen} options={{ headerShown: false }} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}


export default Main;