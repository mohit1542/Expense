import React, { useEffect, useState,Component} from 'react'
import { Text, View,Button, ActivityIndicator, Alert,  } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';
import Parse from 'parse/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ReactDOM } from 'react';


export default function LoginScreen() {


  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');
  const [Loading, setLoading]=useState(false);
  const [isLogged, setIsLogged]=useState(null)


  if (Loading){
    return (
      <View style={{top:'50%'}}>
        <ActivityIndicator size={60} color='blue' />
      </View>
    
    )
  }



  const navigation=useNavigation();


    const userLogin=async function(){
    

    const Email=email;
    const Password=password;

    if(email.trim() == "" || password.trim() == ""){
      Alert.alert('Error!', "Input cannot be empty")
    } else if(password.trim().length<8){
      Alert.alert('Error!', 'Password must be atleast 8 characters')
    }else{
      setLoading(true)
    
    return await Parse.User.logIn(Email,Password,{email:email})
    .then(async(loggedInUser)=>{
      const currentUser=await Parse.User.currentAsync();
      console.log(loggedInUser===currentUser);
      
      if(currentUser !== null){
        const jsonValue=JSON.stringify(loggedInUser)
        await AsyncStorage.setItem("KeepUserLoggedIn", jsonValue);     
        navigation.reset({
          index:0,
          routes:[{name:"MainNavigator"}]
        })
        setLoading(false)
        setIsLogged(jsonValue)
        return jsonValue;
      }
      return true
      
      
    })
    .catch((error)=>{
      Alert.alert('Error', error.message);
      setLoading(false)
      return false;
      
    })
    .finally(()=>{
      setEmail('')
      setPassword('')
      setLoading(false)
    })

  }}
  

    


    // const signIn= () => {
    //   setLoading(true)
    //   const auth = getAuth();
    //   signInWithEmailAndPassword(auth, email, password)
    //   .then((userCredential)=>{
    //     const user =userCredential.user;
    //     navigation.navigate('Chat')
    //     setLoading(false)
    //   })
    //   .catch((error) => {
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   alert(errorMessage)
    //   });


    //   const goToNext=()=>{
    //   const auth = getAuth();
    //   onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     const uid = user.uid;
    //   } else {
    //   // User is signed out
    //   // ...
    //   }
    //   });
    //   return goToNext
    // }
      
    // }

   
    return (
      <View style ={{flex:1,alignItems:'center',backgroundColor:"#fff",justifyContent:'center'}}>
        <Text style={{fontWeight: 'bold',fontSize:20}}>Email</Text>
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
        autoCapitalize='none'
        />

        <Text style={{marginTop:25,fontWeight: 'bold', fontSize:20}}>Password</Text>
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
        
        <View style={[{ width: "70%", margin: 10, }]}>
            <Button title='Sign in' 
            onPress={userLogin}/>
        </View>

        <View style={[{ width: "70%", margin: 10, }]}>
            <Button 
            title='Register' color={`#ff00ff`}
            onPress={() => navigation.navigate('Register')}/>
        </View>
      </View>
    )
}

