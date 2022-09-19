import React, { useState } from 'react'
import { Text, View,Button, Alert,ToastAndroid, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Parse from "parse/react-native.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './LoginScreen';



Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('PPeAzbb69YA9r151tP8oEa5308CSn2XNz5eweCXZ','jtO82lSQGgeXVb3jX0gKm7SMHIwY2booxogq7RbT');
Parse.serverURL = 'https://parseapi.back4app.com/';


const RegisterScreen= ()=>{

  const [email, setEmail]= useState('');
  const [name, setName]= useState('');
  const [password, setPassword]= useState('');
  const [imageURL, setImageUrl]= useState('');

  const navigation=useNavigation();

  const registerUser=async()=>{
    // const Name=name;
    const Name=name;
    const Password=password;

    return await Parse.User.signUp(Name,Password,{email:email, imageURL:imageURL})
      .then((createdUser)=>{
        console.log('registered',
          //`User ${createdUser.getUsername()} was successfully created!`,
          navigation.navigate('MainNavigator')
        );
        return true;
      })
      .catch((error)=>{
        Alert.alert('Error', error.message);
        return false
      })
  }


  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      "You are Registered Successfully!",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };


  return (
    <View style={{flex:1,backgroundColor:"#fff",justifyContent:'center'}}>
    <View style ={{flex:0.9,alignItems:'center',backgroundColor:"#fff",justifyContent:'center', paddingTop:'30%'}}>
        <Text style={{marginTop:15,fontWeight: 'bold'}}>Name</Text>
        <TextInput 
          style={{marginTop:5,width:'90%',paddingHorizontal:8,paddingBottom:8,backgroundColor:'white'}} 
          label={'Name'}
          mode={'outlined'}
          selectionColor={'skyblue'}
          activeOutlineColor={'grey'}
          onChangeText={text => setName(text)}
          value={name}
          maxLength={50}
        />

        <Text style={{fontWeight: 'bold',marginTop:15}}>Email</Text>
        <TextInput 
          style={{marginTop:5,width:'90%',paddingHorizontal:8,paddingBottom:8,backgroundColor:'white',}} 
          label={'Email'}
          mode={'outlined'}
          selectionColor={'skyblue'}
          activeOutlineColor={'grey'}
          keyboardType={'email-address'}
          right={<TextInput.Icon icon='email'/>}
          onChangeText={text => setEmail(text)}
          value={email}
          maxLength={50}
        />
      
        <Text style={{marginTop:15,fontWeight: 'bold'}}>Password</Text>
        <TextInput 
          style={{marginTop:5,width:'90%',paddingHorizontal:8,paddingBottom:8,backgroundColor:'white'}} 
          label={'Password'}
          mode={'outlined'}
          selectionColor={'skyblue'}
          activeOutlineColor={'grey'}
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry
          maxLength={50}
        />
      
        <Text style={{marginTop:15,fontWeight: 'bold'}}>Profile Picture</Text>
        <TextInput 
          style={{marginTop:5,width:'90%',paddingHorizontal:8,paddingBottom:8,backgroundColor:'white'}} 
          label={'Image URL'}
          mode={'outlined'}
          selectionColor={'skyblue'}
          activeOutlineColor={'grey'}
          onChangeText={text => setImageUrl(text)}
          value={imageURL}
          right={<TextInput.Icon icon='image'/>}
        />
      
        <View style={{ width: "70%", margin: 40, }}>
          <Button title='Register' color={`#ff00ff`} onPress={()=>{registerUser();showToastWithGravity()}}/>
        </View>

        <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
          <Text style={{fontSize:18}}>Go to Login Page</Text>
        </TouchableOpacity>

    </View>
    </View>
  )
}


export default RegisterScreen
