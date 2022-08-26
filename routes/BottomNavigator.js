import "react-native-gesture-handler";
import { StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import Statistics from "../screens/Statistics";
import { MaterialIcons } from '@expo/vector-icons';
//import LoginScreen from './screens/LoginScreen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";
import Screen1 from "../screens/Screen1";
import Screen2 from "../screens/Screen2";
import { StatusBar } from "expo-status-bar";

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator()

function StackNavigator() {
  return(
    <Stack.Navigator initialRouteName="Screen1">
      <Stack.Screen
        name="Screen1"
        component={Screen1}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Screen2"
        component={Screen2}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  )
}

export default function BottomNavigator() {
  return (
    <Tab.Navigator
        initialRouteName="StackNavigator"
        activeColor='blue'
        inactiveColor='grey'
        barStyle={{backgroundColor: 'white'}}
        labeled={false}
        shifting={false}
      >
        <Tab.Screen 
          name="StackNavigator" 
          component ={StackNavigator}  
          options={{
            tabBarIcon:({color})=>(<Entypo name="home" size={24} color={color}/>)
          }}
        />
        <Tab.Screen 
        name="Stats" 
        component ={Statistics} 
        options={{
          tabBarIcon:({color})=>(<Ionicons name="stats-chart-sharp" size={24} color={color} />)
      }}
        />
        {/* <Tab.Screen 
        name="Login" 
        component ={LoginScreen} 
        options={{tabBarIcon:({color})=>(<Entypo name="login" size={24} color={color} />)}}
        /> */}
      </Tab.Navigator>
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
