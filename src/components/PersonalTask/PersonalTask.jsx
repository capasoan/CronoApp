import React , {useState} from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet, TextInput, FlatList} from 'react-native';
import Timer from "../Timer/Timer";

const PersonalTask=()=>{
    const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
 

  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, { key: Date.now().toString(), task, 
        completed: false, 
        timerRunning: false, 
        time: 5,
        alarmActive: false,
        cycleCount: 0, }]);
        
      setTask("");
    }
  };


  const startTimer = (taskKey) => {
    setTasks(tasks.map(item => 
      item.key === taskKey 
        ? { ...item, timerRunning: true ,alarmActive: false }
        : item
    ));

  };
 
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
    setTasks(tasks.map(item =>
      item.key===taskKey ? {...item, completed: !item.completed,timerRunning: false, time: 0 } : item
    ))
  }
  

  const deleteTask = (taskKey) => {
    setTasks(tasks.filter(item => item.key !== taskKey));
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
            <Timer task={item} startTimer={startTimer} 
             
            resetToInitialTimer={resetToInitialTimer} />
           
          </View>
        )}
      />
    </View>
       
    )
}

export default PersonalTask;


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
  