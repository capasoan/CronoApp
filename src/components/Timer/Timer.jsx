import React, { useState, useEffect } from "react";
import { View, Text, Button, Alert } from "react-native";
import { Audio } from "expo-av";

const Timer = ({ task, resetToInitialTimer }) => {
  const [timeLeft, setTimeLeft] = useState(task?.time || 0);
  const [sound, setSound] = useState();
  const [isActive, setIsActive] = useState(false);
  const [initialStart, setInitialStart] = useState(false);

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../../../assets/Sound/square-beep-long-1-185290.mp3")
    );
    setSound(sound);
    await sound.playAsync();
  };

  const handleStartStop = () => {
    if (!initialStart) {
      setInitialStart(true);
    }
    setIsActive(!isActive);
  };

  useEffect(() => {
    if (task) {
      setTimeLeft(task.time);
    }
  }, [task]);

  useEffect(() => {
    let timer;

    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }

    if (!isActive || timeLeft === 0) {
      clearInterval(timer);
    }

    if (timeLeft === 0 && isActive) {
      playSound();
      Alert.alert("Turn off", "Time Completed", [
        { text: "Turn off", onPress: () => resetToInitialTimer(task.key) },
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

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <View style={{ padding: 20, alignItems: "center" }}>
      <Text style={{ fontSize: 40, marginBottom: 20 }}>
        {formatTime(timeLeft)}s
      </Text>
      <Button
        title={isActive ? "pause" : initialStart ? "resume" : "start"}
        onPress={handleStartStop}
      />
    </View>
  );
};

export default Timer;
