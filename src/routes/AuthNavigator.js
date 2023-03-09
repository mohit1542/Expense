import { createStackNavigator } from '@react-navigation/stack'
import React, { Component } from 'react'
import { Text, View, StatusBar } from 'react-native'
import LoginScreen from '../views/auth/LoginScreen'
import RegisterScreen from '../views/auth/RegisterScreen'
import MainNavigator from '../routes/MainNavigator'


const Stack =createStackNavigator()

function AuthNavigator() {
    return (
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen 
                name="Login" 
                component={LoginScreen} 
                options={{headerShown: false}}
            />

            <Stack.Screen 
                name="Register" 
                component={RegisterScreen} 
                options={{headerShown: false}}
            />

            <Stack.Screen
                name="MainNavigator" 
                component={MainNavigator} 
                options={{headerShown: false}}
            />

        </Stack.Navigator>
    )
  }


export default AuthNavigator
