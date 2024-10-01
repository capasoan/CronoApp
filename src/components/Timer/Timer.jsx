import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert} from 'react-native';
import { Audio } from 'expo-av';

const Timer = ({ task, startTimer, resetToInitialTimer }) => { 
  const [timeLeft, setTimeLeft] = useState(task?.time || 0);
  const [sound, setSound] = useState()
  const [isActive, setIsActive] = useState(false);

  const playSound = async () => { 
    const { sound } = await Audio.Sound.createAsync(
      require('../../../assets/Sound/square-beep-long-1-185290.mp3')
    ); 
    setSound(sound);
    await sound.playAsync(); 
  };
  
  const handleStartStop=()=>{
    setIsActive(!isActive);
   }
 
  useEffect(() => {

    if (task) { 
      setTimeLeft(task.time); 
    }
  }, [task]);
  

  useEffect(() => {
    let timer;
    
    if (isActive && timeLeft  > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    }
  
    if (!isActive || timeLeft === 0) {
      clearInterval(timer);
    }
  
      if (timeLeft === 0 && isActive) {
        playSound(); 
        Alert.alert('Alarma', 'Tiempo completado', [
          { text: 'Apagar alarma', onPress: () => resetToInitialTimer(task.key) }, 
        ]);
      }
    
  
    return () => clearInterval(timer);
  }, [isActive, timeLeft]);
  

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync(); 
        }
      : undefined;
  }, [sound]);


  return (
    <View style={{ padding: 20, alignItems: 'center' }}>
      <Text style={{ fontSize: 40, marginBottom: 20 }}>{timeLeft}s</Text>
      <Button title="Iniciar" onPress={() => startTimer(task.key)} disabled={task?.timerRunning} />
      <Button title={isActive ? "Pausar" : "Reanudar"} onPress={handleStartStop} />


    </View>
  );
};

export default Timer;
