import React, { useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import WorkoutScreen from './workout/WorkoutScreen';
import DoRoutineScreen from './doRoutine/DoRoutineScreen';
import RoutineOverviewScreen from './routineOverview/RoutineOverviewScreen';
import HistoryScreen from './history/HistoryScreen';
import SignInScreen from './signIn/SignInScreen';
import SignUpScreen from './signUp/SignUp';
import ProfileScreen from './profile/ProfileScreen';
import { useAuth } from './authContext';
import AuthStorageContext from '../contexts/AuthStorageContext';
import theme from '../theme';


function ExerciseScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Exercise</Text>
    </View>
  );
}

const RootStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // eslint-disable-next-line react/display-name
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'History') {
            iconName = focused ? 'history' : 'history';
          }
          else if (route.name === 'Workout') {
            iconName = focused ? 'fitness-center' : 'fitness-center';
          }
          else if (route.name === 'Exercise') {
            iconName = focused ? 'inventory' : 'inventory';
          }
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#0366d6',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name='Profile' component={ProfileScreen} />
      <Tab.Screen name='History' component={HistoryScreen} />
      <Tab.Screen name='Workout' component={WorkoutScreen} />
      <Tab.Screen name='Exercise' component={ExerciseScreen} />
    </Tab.Navigator>
  );
};

const Main = () => {
  const [auth, setAuth] = useAuth();
  const authStorage = useContext(AuthStorageContext);

  const authorizedUserCheck = async () => {
    const savedToken = await authStorage.getAccessToken();
    if (savedToken) {
      setAuth(true);
    }
  };

  useEffect(() => {
    authorizedUserCheck();   
  }, []);

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
        {auth ? (
          <>
            <RootStack.Screen
              name='Home'
              options={{ headerShown: false }}
              component={Home}
            />
            <RootStack.Screen
              name='RoutineOverview'
              component={RoutineOverviewScreen}
              options={{
                title: 'Routine Overview',
                headerTitleStyle: {
                  color: theme.colors.primary,
                  fontFamily: theme.fonts.main,
                  fontWeight: theme.fontWeights.bold,
                }
              }}
            />
            <RootStack.Screen
              name='DoRoutine'
              component={DoRoutineScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
            <>
              <RootStack.Screen
                name='SignIn'
                options={{
                  title: 'Sign in',
                }}
                component={SignInScreen}
              />
              <RootStack.Screen
                name='SignUp'
                options={{
                  title: 'Sign up',
                }}
                component={SignUpScreen}
              />
            </>
          )
        }
      </RootStack.Navigator>
    </NavigationContainer>
  );
};


export default Main;