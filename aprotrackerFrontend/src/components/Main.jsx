import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import WorkoutScreen from './workout/WorkoutScreen';
import DoRoutineScreen from './doRoutine/DoRoutineScreen';
import RoutineOverviewScreen from './routineOverview/RoutineOverviewScreen';
import HistoryScreen from './history/HistoryScreen';
import theme from '../theme';

function ProfileScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>This is the profile screen!</Text>
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
      <RootStack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
        <RootStack.Screen name="Home" options={{ headerShown: false }} component={Home} />
        <RootStack.Screen
          name="RoutineOverview"
          component={RoutineOverviewScreen}
          options={{
            title: 'Routine Overview',
            headerTitleStyle: {
              color: theme.colors.primary,
            }
          }}
        />
        <RootStack.Screen name="DoRoutine" component={DoRoutineScreen} options={{ headerShown: false }} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}


export default Main;