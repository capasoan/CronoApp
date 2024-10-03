import React, {useState, useEffect}from 'react';
import { View, Text, Button,} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";




export default function Home({navigation}) {
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    const loadCompletedTasks = async () => {
      try {
        const storedCompletedTasks = await AsyncStorage.getItem('completedTasks');
        if (storedCompletedTasks) {
          const parsedCompletedTasks = JSON.parse(storedCompletedTasks);
          console.log("Tareas completadas cargadas:", parsedCompletedTasks);
          setCompletedTasks(parsedCompletedTasks);
        }
      } catch (error) {
        console.error("Error al cargar las tareas completadas:", error);
      }
    };
    loadCompletedTasks();
  }, []);
  

  return (
    <View>  
      <Text>Bienvenida a la App de Tareas</Text>
        <Text>
        Esta aplicación te permite gestionar tus tareas diarias. Puedes agregar,
        eliminar, y completar tareas, además de utilizar un temporizador para manejar 
        el tiempo de cada una. Utiliza el famoso metodo Pomodoro, es una técnica de 
        gestión del tiempo desarrollada por Francesco Cirillo a fines de la década 
        de 1980. Su objetivo es mejorar la productividad y la concentración dividiendo
        el trabajo en intervalos de tiempo llamados "Pomodoros", generalmente de 25
        minutos, seguidos de un breve descanso de 5 minutos.
      </Text>
      <Button
        title="Ir a la lista de tareas personales"
        onPress={() => navigation.navigate('PersonalTask')}
      />
        <Button
        title="Ir a la lista de tareas de trabajo"
        onPress={() => navigation.navigate('BusinessTask')}
      />
         <Button
        title="Ir al Perfil"
        onPress={() => navigation.navigate('Profile')}
      />
      <Button
  title="Ver Tareas Completadas"
  onPress={() => navigation.navigate('CompletedTask', { completedTasks })}
/>

    </View>
  );
}

