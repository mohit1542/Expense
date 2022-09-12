import "react-native-gesture-handler";
import { StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import Statistics from "../views/nav/Statistics";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";
import Screen1 from "../views/nav/Screen1";
import Screen2 from "../views/nav/Screen2";

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator()

function StackNavigator1() {
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


// Stacknavigator2's views not added yet

// function StackNavigator2(){
//   return(
//     <Stack.Navigator initialRouteName="TransactionView">
//         <Stack.Screen
//             name="TransactionsView" 
//             component={TransactionsView} 
//             options={{headerShown: false}}
//         />

//         <Stack.Screen
//             name="UpdateTransactionsView" 
//             component={UpdateTransactionsView} 
//             options={{headerShown: false}}
//         />

//     </Stack.Navigator>
//   )
// }



function BottomNavigator() {
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
            name="StackNavigator1" 
            component ={StackNavigator1} 
            options={{
              tabBarIcon:({color})=>(
                <Entypo name="home" color={color} size={26} />
              )
          }}
          />

        <Tab.Screen 
            name="Stats" 
            component ={Statistics} 
            options={{
              tabBarIcon:({color})=>(
              <Ionicons name="stats-chart-sharp" size={24} color={color} />
              )
          }}
        />

    </Tab.Navigator>

  );
}

export default BottomNavigator

