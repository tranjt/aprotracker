import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { useApolloClient } from '@apollo/client';

import { useAuth } from '../../utils/authContext';
import AuthStorageContext from '../../contexts/AuthStorageContext';
import Button from '../Button';


const ProfileScreen = () => {
  const apolloClient = useApolloClient();
  const authStorage = useContext(AuthStorageContext);
  const [, setAuth] = useAuth();

  const logout = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    setAuth(false);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>This is the profile screen!</Text>
      <Button
        onPress={() => logout()}
        title='Sign out'
        titleStyle={{ color: 'black' }}
      />
    </View>
  );
};


export default ProfileScreen;