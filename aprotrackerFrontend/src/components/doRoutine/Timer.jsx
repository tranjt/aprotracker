import React from 'react';
import { View, Modal, StyleSheet, Text, Button, } from 'react-native';
import { stringToSeconds } from '../../utils/timedate';
import { secondsToHmsV2 } from '../../utils/timedate';
import TextInput from '../TextInput';

import theme from '../../theme';


const Timer = ({ modalVisible, setModalVisible, timer, setTimerActive, handleTimerChange }) => {

  const subThirtySec = () => {
    if (stringToSeconds(timer) >= 30) {
      const timerInSeconds = stringToSeconds(timer) - 30;
      const timerInString = secondsToHmsV2(timerInSeconds);
      handleTimerChange(timerInString);
    }
  };

  const addThirtySec = () => {
    const timerInSeconds = stringToSeconds(timer) + 30;
    const timerInString = secondsToHmsV2(timerInSeconds);
    handleTimerChange(timerInString);
  };

  const closeTimer = () => {
    setTimerActive(false);
    handleTimerChange('00:45');
    setModalVisible(!modalVisible);
  };

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.modalView}>
        <Text style={styles.title}>Timer</Text>
        <View style={styles.container}>
          <View style={styles.timer}>
            <View style={styles.containerTextInput}>
              <TextInput
                style={styles.textStyle}
                value={timer}
                onChangeText={value => handleTimerChange(value)}
                keyboardType='number-pad'
                selectTextOnFocus
              />
            </View>
            <View style={styles.buttons}>
              <Button
                onPress={() => subThirtySec()}
                title='-30s'
                color='#AAAAAA'
              />
              <Button
                onPress={() => setTimerActive(false)}
                title='Stop'
                color='#AAAAAA'
              />
              <Button
                onPress={() => setTimerActive(true)}
                title='Start'
                color={theme.colors.primary}
              ></Button>
              <Button
                onPress={() => addThirtySec()}
                title='+30s'
                color='#AAAAAA'
              />
            </View>
          </View>
        </View>
      </View>
      <Button
        onPress={() => closeTimer()}
        title='Close timer'
        color={theme.colors.primary}
      />
    </Modal>
  );
};


const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  title: {
    alignSelf: 'center',
    paddingBottom: 15,
    color: theme.colors.textPrimary,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.title
  },
  containerTextInput: {
    marginBottom: 40
  },
  textStyle: {
    color: 'black',
    fontSize: 45,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttons: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10
  },
  timer: {
    justifyContent: 'center',


  }
});

export default Timer;