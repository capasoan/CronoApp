import { View, Text, Button } from "react-native";

const Categories = ({ navigation }) => {
  return (
    <View>
      <Button
        title="Personal"
        onPress={() => navigation.navigate("Personal")}
      />
      <Button
        title="Business"
        onPress={() => navigation.navigate("Business")}
      />
    </View>
  );
};

export default Categories;
