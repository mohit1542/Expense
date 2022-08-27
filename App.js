import "react-native-gesture-handler";
import { StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./VerifyScreen/LoginScreen";
import BottomNavigator from "./routes/BottomNavigator";
import RegisterScreen from "./VerifyScreen/RegisterScreen";


const Stack = createStackNavigator()

export default function App() {
  return(
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">

      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="BottomScreen"
        component={BottomNavigator}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
    </NavigationContainer>
  );

  }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

