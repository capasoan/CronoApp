import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../views/Home/Home";
import PersonalTask from "../components/PersonalTask/PersonalTask";
import BusinessTask from "../components/BusinessTask/BusinessTask";
import Profile from "../views/Profile/Profile ";
import CompletedTask from "../components/CompletedTasks/CompletedTasks";

const Stack = createNativeStackNavigator();

const routeScreenDefaultsOptions = {
  headerStyle: {
    backgroundColor: "rgba(7, 26, 93, 255)",
  },
  headerTitleStyles: {
    color: "#FFF",
  },
};
const Routes = () => {
  return (
    <Stack.Navigator>
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen
      name="PersonalTask"
      component={PersonalTask}
      options={routeScreenDefaultsOptions}
    />
    <Stack.Screen
      name="BusinessTask"
      component={BusinessTask}
      options={routeScreenDefaultsOptions}
    />
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={routeScreenDefaultsOptions}
    />
 <Stack.Screen 
  name="CompletedTask" 
  component={CompletedTask} 
  options={routeScreenDefaultsOptions} 
/>

  </Stack.Navigator>
  );
};

export default Routes;
