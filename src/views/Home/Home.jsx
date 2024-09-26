import React from 'react';
import { View, Text} from 'react-native';
import TodoAdd from "../../components/TodoAdd/TodoAdd"
import Timer from "../../components/Timer/Timer"

export default function Home() {
  return (
    <View>
        <Text>Hola</Text>
        <TodoAdd/>
        <Timer/>
    </View>
  );
}

