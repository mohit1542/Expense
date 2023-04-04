import { useEffect, useState } from "react";
import "react-native-gesture-handler";
import { NavigationContainer} from '@react-navigation/native';
import AuthNavigator from "./src/routes/AuthNavigator";
import MainNavigator from "./src/routes/MainNavigator";
import Parse from "parse/react-native.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from "expo-status-bar";

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize(Parse.applicationId,Parse.javaScriptKey);
Parse.serverURL = 'https://parseapi.back4app.com/';

export default function App() {

  const [isLogged, setIsLogged]=useState(null)
  

  const getData= async()=>{
    try {
      const user= await AsyncStorage.getItem("KeepUserLoggedIn");
      //console.log(user)
      setIsLogged(user)
      //return user !== null ? JSON.parse(user) : null;
    } catch (error) {
      console.log('error in fetching data')
    }
  }

  useEffect(()=>{
    getData()
  },[isLogged])



  return(
    <NavigationContainer>
        <StatusBar style="light"/>
        {isLogged? <MainNavigator/> : <AuthNavigator/>}
    </NavigationContainer>
      
  )
}


