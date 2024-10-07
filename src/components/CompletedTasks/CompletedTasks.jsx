import React, {useState, useEffect} from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CompletedTask = () => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const numeroTareasCompletadas = completedTasks.length;

 // console.log("Numero de tareas", numeroTareasCompletadas)

  const loadCompletedTasksFromStorage = async () => {
    try {
      const storedCompletedTasks = await AsyncStorage.getItem('completedTasks');
      if (storedCompletedTasks) {
        setCompletedTasks(JSON.parse(storedCompletedTasks));
      }
    } catch (error) {
      console.error("Error al cargar las tareas completadas desde AsyncStorage:", error);
    }
  };

  useEffect(() => {
    loadCompletedTasksFromStorage(); 
  }, []);
  console.log("completedTasks",completedTasks)
  return (
    <View>
      <Text style={styles.heading}>Tareas Completadas</Text>
      <Text>Numero de tareas completadas: {numeroTareasCompletadas}</Text>
      <FlatList
        data={completedTasks}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.taskText}>{item.task}</Text>
          </View>
        )}
        keyExtractor={item => item.key}
      />
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  taskContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  taskText: {
    fontSize: 18,
  },
});

export default CompletedTask;
