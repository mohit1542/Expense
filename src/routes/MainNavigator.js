import { createStackNavigator } from '@react-navigation/stack'
import React, { Component } from 'react'
import { Text, View } from 'react-native'
import BottomNavigator from './BottomNavigator'
import AuthNavigator from './AuthNavigator'

const Stack= createStackNavigator()

function MainNavigator() {
    return (
      <Stack.Navigator initialRouteName='BottomNavigator'>
            <Stack.Screen
                name="BottomNavigator" 
                component={BottomNavigator} 
                options={{headerShown: false}}
            />

            <Stack.Screen
                name="AuthNavigator" 
                component={AuthNavigator} 
                options={{headerShown: false}}
            />
      </Stack.Navigator>
    )
}

export default MainNavigator
