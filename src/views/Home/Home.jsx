import { View, Text, Button, StyleSheet } from "react-native";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Crono</Text>
      <Text style={styles.description}>
        This app allows you to manage your daily tasks. You can add, delete and
        complete tasks, as well as use a timer to manage the time for each one.
        It uses the famous Pomodoro method, it is a time management technique
        developed by Francesco Cirillo in the late 1980s. It aims to improve
        productivity and concentration by dividing work into time intervals
        called "Pomodoros", usually 25 minutes long, followed by a short
        5-minute break.
      </Text>
      <Button
        title="Categories"
        onPress={() => navigation.navigate("Categories")}
      />
      <Button title="Profile" onPress={() => navigation.navigate("Profile")} />
      <Button
        title="Analytic"
        onPress={() => navigation.navigate("Analytic")}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#071A5D",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#FFF",
    lineHeight: 24,
  },
});
