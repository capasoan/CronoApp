import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import Home from "../../src/views/Home/Home";
import TodoAdd from "@/src/components/TodoAdd/TodoAdd";

const Stack = createNativeStackNavigator();

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="TodoAdd"
          component={TodoAdd}
          options={{ title: "Lista de tareas" }}
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
