import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Analytic = () => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [deletedTasks, setDeletedTasks] = useState([]);
  const [totalTasks, setTotalTasks] = useState(0);

 
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

  
  const loadDeletedTasksFromStorage = async () => {
    try {
      const storedDeletedTasks = await AsyncStorage.getItem('deletedTasks');
      if (storedDeletedTasks) {
        setDeletedTasks(JSON.parse(storedDeletedTasks));
      }
    } catch (error) {
      console.error("Error al cargar las tareas eliminadas desde AsyncStorage:", error);
    }
  };

  useEffect(() => {
    loadCompletedTasksFromStorage();
    loadDeletedTasksFromStorage();
  }, []);


  useEffect(() => {
    setTotalTasks(completedTasks.length + deletedTasks.length);
  }, [completedTasks, deletedTasks]);


  const completedPercentage = totalTasks > 0 ? (completedTasks.length / totalTasks) * 100 : 0;
  const deletedPercentage = totalTasks > 0 ? (deletedTasks.length / totalTasks) * 100 : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Task Statistics</Text>
      <Text style={styles.statText}>Total Tasks: {totalTasks}</Text>
      <Text style={styles.statText}>Completed tasks: {completedTasks.length} ({completedPercentage.toFixed(2)}%)</Text>
      <Text style={styles.statText}>Tasks Deleted: {deletedTasks.length} ({deletedPercentage.toFixed(2)}%)</Text>
      <Text style={styles.subHeading}>Completed tasks</Text>
      <FlatList
        data={completedTasks}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.taskText}>{item.task}</Text>
          </View>
        )}
        keyExtractor={(item) => item.key}
      />
      <Text style={styles.subHeading}>Tasks Deleted</Text>
      <FlatList
        data={deletedTasks}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.taskText}>{item.task}</Text>
          </View>
        )}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
};

export default Analytic;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  statText: {
    fontSize: 18,
    marginBottom: 5,
  },
  subHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  taskContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  taskText: {
    fontSize: 16,
  },
});
