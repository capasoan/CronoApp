import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';

const Timer = () => {
  const [time, setTime] = useState(0); 
  const [running, setRunning] = useState(false); 


  useEffect(() => {
    let timer;
    if (running) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    if (time >= 30) {
      clearInterval(timer);
      setRunning(false); 
    }

    return () => clearInterval(timer);
  }, [running, time]);

  const startTimer = () => {
    setTime(0); 
    setRunning(true); 
  };

  return (
    <View style={{ padding: 20, alignItems: 'center' }}>
      <Text style={{ fontSize: 40, marginBottom: 20 }}>{time}s</Text>
      <Button title="Iniciar" onPress={startTimer} disabled={running} />
    </View>
  );
};

export default Timer;
