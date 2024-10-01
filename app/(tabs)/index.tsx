import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import Home from "../../src/views/Home/Home";
import PersonalTask from "@/src/components/PersonalTask/PersonalTask";
import BusinessTask from "@/src/components/BusinessTask/BusinessTask";

const Stack = createNativeStackNavigator();

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="PersonalTask"
          component={PersonalTask}
          options={{ title: "Lista de tareas personales" }}
        />
        <Stack.Screen
          name="BusinessTask"
          component={BusinessTask}
          options={{ title: "Lista de tareas de trabajo" }}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
  },
});
