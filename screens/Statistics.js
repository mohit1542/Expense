import React, { Component, useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import AnimatedLottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Statistics =()=> {

  // const [Statistics, setStatistics]=useState('');

  // useEffect(()=>{
  //   getData();
  // },[]);

  // const getData = async()=>{
  //   try {
  //     const value =await AsyncStorage.getItem('ListItem')
  //     if (value!==null){
  //       setStatistics(Statistics)
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }


    return (
      <View>
         <AnimatedLottieView
        style={{height:250, width:250,marginTop:175, marginTop:12}}

        source={require('../assets/30173-welcome-screen.json')}
        autoPlay
        />
      </View>
    )
}

export default Statistics
