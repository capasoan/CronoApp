import React , {useState, useEffect} from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet, TextInput, FlatList} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import Timer from "../Timer/Timer";

const BusinesTask=()=>{
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [completedTasks, setCompletedTasks] = useState([]);

  const addTask = () => {
    if (task.trim() !== "") {
      const newTask = {
        key: Date.now().toString(),
        task,
        completed: false,
        timerRunning: false,
        time: 5,
        alarmActive: false,
        cycleCount: 0,
      };
      setTasks([...tasks, newTask]);
      saveTasksToStorage([...tasks, newTask]);
        
      setTask("");
    }
  };
  


  const loadTasksFromStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('businessTasks'); 
      return jsonValue != null ? JSON.parse(jsonValue) : []; 
    } catch (e) {
      console.error('Error al cargar las tareas desde AsyncStorage:', e);
      return [];
    }
  };

  const saveTasksToStorage = async (tasksToSave) => {
    try {
      await AsyncStorage.setItem('businessTasks', JSON.stringify(tasksToSave)); 
    } catch (e) {
      console.error('Error al guardar las tareas en AsyncStorage:', e);
    }
  };

useEffect(() => {
  const loadTasks = async () => {
    const savedTasks = await loadTasksFromStorage();
    const savedCompletedTasks = await AsyncStorage.getItem('completedTasks');
    setTasks(savedTasks);
    setCompletedTasks(savedCompletedTasks != null ? JSON.parse(savedCompletedTasks) : []);
    
  };
  loadTasks();
}, []); 


  const resetToInitialTimer = (taskKey) => {
    console.log("resetToInitialTimer invoked for taskKey:", taskKey); 
    setTasks(
      tasks.map((item) => {
        if (item.key === taskKey) {
          let newTime = item.time === 5 ? 3 : 5; 
          let newCycleCount = item.cycleCount + 1; 
  
          return {
            ...item,
            time: newTime,
            timerRunning: false, 
            cycleCount: newCycleCount,
            alarmActive: false, 
          };
        }
        return item;
      })
    );
  };
  
  
  const completeTask = (taskKey) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(item => 
          item.key === taskKey ? { ...item, completed: true } : item
      ).filter(item => !item.completed);
    const completedTask = prevTasks.find(item => item.key === taskKey);
    if (completedTask) {
        setCompletedTasks(prevCompleted => [...prevCompleted, completedTask]);
        saveCompletedTasksToStorage([...completedTasks, completedTask]);
    }
    saveTasksToStorage(updatedTasks);
    return updatedTasks;
  })
  }
  
  const saveCompletedTasksToStorage = async (completedTasksToSave) => {
    try {
        await AsyncStorage.setItem('completedTasks', JSON.stringify(completedTasksToSave));
    } catch (e) {
        console.error('Error al guardar las tareas completadas en AsyncStorage:', e);
    }
};
  const deleteTask = (taskKey) => {
    const updatedTasks = tasks.filter(item => item.key !== taskKey);
    setTasks(updatedTasks);
    saveTasksToStorage(updatedTasks);
  };

    return(
  
      <View style={styles.container}>
      <Text style={styles.heading}>Treas de hoy</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a task"
          value={task}
          onChangeText={setTask}
        />
        <Button title="Add" onPress={addTask} />
      </View>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.taskText}>{item.task}</Text>
            <TouchableOpacity onPress={() => completeTask(item.key)}>
        <Text style={styles.completeText}>{item.completed ? "Undo" : "Complete"}</Text>
      </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTask(item.key)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
            <Timer task={item} 
             
            resetToInitialTimer={resetToInitialTimer} />
           
          </View>
        )}
      />
    </View>
       
    )
}

export default BusinesTask;


const styles = StyleSheet.create({
    container: {
      marginTop: 20,
    },
    heading: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 10,
      textAlign: "center",
    },
    inputContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    input: {
      borderBottomWidth: 1,
      borderColor: "#333",
      padding: 10,
      flex: 1,
      marginRight: 10,
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
    deleteText: {
      color: "red",
      fontWeight: "bold",
    },
    completeText: {
      color: "green",
      fontWeight: "bold",
      marginRight: 10,
    },
  });
  