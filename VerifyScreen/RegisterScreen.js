import React, { useState } from 'react'
import { Text, View,Button, Alert } from 'react-native'
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Parse from "parse/react-native.js";
import AsyncStorage from '@react-native-async-storage/async-storage';


Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('LIfdhz6b9Few6fSBtw7ZMlGOrIR8Psx8axOGjQxA','pzd8mAbqTYSxzZrc23K4gYda5ymkVZ9Hyg0M4tKq');
Parse.serverURL = 'https://parseapi.back4app.com/';


export default function RegisterScreen (){

  const [email, setEmail]= useState('');
  const [name, setName]= useState('');
  const [password, setPassword]= useState('');
  const [imageURL, setImageUrl]= useState('');

  const navigation=useNavigation();

  const registerUser=async function(){
    const Email=email;
    const Password=password;

    return await Parse.User.signUp(Email,Password)
      .then((createdUser)=>{
        Alert.alert(
          'Success!',
          //`User ${createdUser.getUsername()} was successfully created!`,
        );
        return true;
      })
      .catch((error)=>{
        Alert.alert('Error', error.message);
        return false
      })
  }

  // const register =()=> {
  // const auth =getAuth()
  // createUserWithEmailAndPassword(auth, email, password)
  // .then((userCredential) => {
  // // Signed in 
  // const user = userCredential.user;
  

  // const showToastWithGravity = () => {
  //   ToastAndroid.showWithGravity(
  //     "All Your Base Are Belong To Us",
  //     ToastAndroid.SHORT,
  //     ToastAndroid.CENTER
  //   );
  // };
  
//   updateProfile( auth.currentUser,{
//   displayName: name, photoURL: imageURL? imageURL:'https://images.unsplash.com/photo-1660089796700-9117d02e8e34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
//   }).then(() => {
//   // Profile updated!
//   // ...
//   }).catch((error) => {
//   // An error occurred
//   // ...
//   navigation.navigate('Chat')
//   });

//   })
//   .catch((error) => {
//   const errorMessage = error.message;
//   alert(errorMessage)
//   // ..
//   });
  
//   const awaits =async ()=> {
//     try {
//       const docRef =  await addDoc(collection(db, "details"), {
//       last:"mkm",
//       email:email,
//       name:name,
//       pic:imageURL,
//     });
//       console.log("Document written with ID: ", docRef.id);
//     } catch (error) {
//       console.error("Error adding document",error);
//     //alert("something went wrong");
//     }}

// }


  return (
    <View style ={{flex:1,alignItems:'center',backgroundColor:"#fff",justifyContent:'center'}}>
      <Text style={{marginTop:15,fontWeight: 'bold'}}>Name</Text>
      <TextInput 
        style={{marginTop:5,width:'90%',paddingHorizontal:8,paddingBottom:8,backgroundColor:'white'}} 
        label={'Name'}
        mode={'outlined'}
        selectionColor={'skyblue'}
        activeOutlineColor={'grey'}
        onChangeText={text => setName(text)}
        value={name}
        secureTextEntry
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
      
      <View style={[{ width: "70%", margin: 40, }]}>
          <Button title='Register' color={`#ff00ff`} onPress={()=>registerUser}/>
      </View>
    </View>
  )
}
