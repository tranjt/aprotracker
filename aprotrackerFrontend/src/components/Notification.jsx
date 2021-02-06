import React from 'react';
import { View, StyleSheet } from 'react-native';
import theme from '../theme';
import Text from './Text';

const Notification = ({ notification }) => {

  const style = [    
    notification !== '' && styles.notification,
  ];

  if(!notification) {
    return null;
  }

  return (
    <View style={style}>
      <Text style={styles.text}>{notification}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  notification: {      
    padding: 10,
    borderWidth: 1,
    borderColor: theme.colors.error,
    backgroundColor: 'white',
    borderRadius: 2,
    margin: 10
  },
  text: {
    color: theme.colors.error,
  }
});

export default Notification;