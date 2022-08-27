import React, { useState } from 'react'
import { Text, View,Button, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';
import Realm from 'realm';

export default function LoginScreen() {



  const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    const [Loading, setLoading]=useState(false);
    if (Loading){
      return <ActivityIndicator size='large' color='blue' />
    }

    const navigation=useNavigation();


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
            <Button title='Sign in'/>
        </View>

        <View style={[{ width: "70%", margin: 10, }]}>
            <Button 
            title='Register' color={`#ff00ff`}
            onPress={() => navigation.navigate('Register')}/>
        </View>
      </View>
    )
}

