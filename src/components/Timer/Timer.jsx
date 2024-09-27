import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert} from 'react-native';

const Timer = ({ task, startTimer, stopAlarmAndStartNextTimer }) => { 
  const [timeLeft, setTimeLeft] = useState(task?.time || 0);
  useEffect(() => {
    if (task) { 
      setTimeLeft(task.time); 
    }
  }, [task]);

  useEffect(() => {
    let timer;
    if (task?.timerRunning && timeLeft > 0) { 
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    }

    if (timeLeft === 0 && task?.timerRunning) {
      clearInterval(timer);
      Alert.alert("Alarma", "Tiempo completado", [
        { text: "Apagar alarma", onPress: () => stopAlarmAndStartNextTimer(task.key) }
      ]);
    }

    return () => clearInterval(timer);
  },  [task, timeLeft]);


  return (
    <View style={{ padding: 20, alignItems: 'center' }}>
      <Text style={{ fontSize: 40, marginBottom: 20 }}>{timeLeft}s</Text>
      <Button title="Iniciar" onPress={() => startTimer(task.key)} disabled={task?.timerRunning} />
    </View>
  );
};

export default Timer;
