import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../views/Home/Home";
import PersonalTask from "../components/PersonalTask/PersonalTask";
import BusinessTask from "../components/BusinessTask/BusinessTask";
import Categories from "../components/Categories/Categories";
import Profile from "../views/Profile/Profile ";
import Analytic from "../views/Analytic/Analytic";

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
        name="Personal"
        component={PersonalTask}
        options={routeScreenDefaultsOptions}
      />
      <Stack.Screen
        name="Business"
        component={BusinessTask}
        options={routeScreenDefaultsOptions}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={routeScreenDefaultsOptions}
      />
      <Stack.Screen
        name="Analytic"
        component={Analytic}
        options={routeScreenDefaultsOptions}
      />
      <Stack.Screen
        name="Categories"
        component={Categories}
        options={routeScreenDefaultsOptions}
      />
    </Stack.Navigator>
  );
};

export default Routes;
