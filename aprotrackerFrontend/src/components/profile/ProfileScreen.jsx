import React from 'react';
import { View, Text } from 'react-native';
import { useApolloClient } from '@apollo/client';

import { useAuth } from '../authContext';
import Button from '../Button';

const ProfileScreen = () => {
  const apolloClient = useApolloClient();
  const [, setAuth] = useAuth();

  const logout = () => {
    setAuth(false);
    apolloClient.resetStore();
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>This is the profile screen!</Text>
      <Button
        onPress={() => logout()}
        title='Sign out'
        titleStyle={{ color: 'Tomato' }}
      />
    </View>
  );
};


export default ProfileScreen;