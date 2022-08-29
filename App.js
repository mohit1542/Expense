import { useEffect, useState } from "react";
import "react-native-gesture-handler";
import { StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./VerifyScreen/LoginScreen";
import BottomNavigator from "./routes/BottomNavigator";
import RegisterScreen from "./VerifyScreen/RegisterScreen";
import Parse from "parse/react-native.js";
import AsyncStorage from '@react-native-async-storage/async-storage';




Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('PPeAzbb69YA9r151tP8oEa5308CSn2XNz5eweCXZ','jtO82lSQGgeXVb3jX0gKm7SMHIwY2booxogq7RbT');
Parse.serverURL = 'https://parseapi.back4app.com/';



const Stack = createStackNavigator()

export default function App() {

  const [isLogged, setIsLogged]=useState();

  // const _retrieveData= async()=>{
  //   try {
  //     const data= await AsyncStorage.getItem("KeepUserLoggedIn");
  //     console.log(data)
  //     setIsLogged(data)
  //   } catch (error) {
      
  //   }
  // }

  // useEffect(()=>{
  //   _retrieveData()
  // })


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

