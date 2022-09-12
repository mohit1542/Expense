import React, { Component, useEffect, useState } from 'react'
import { Button, Text, View , StyleSheet,Image, ScrollView, RefreshControl} from 'react-native'
import AnimatedLottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';



const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};


const Statistics =()=> {

  const [selectedImage, setSelectedImage] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

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



  //Image picker from mobile
  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled ==true) {
      return;
    }

    setSelectedImage({localUri:pickerResult.uri});

    if (selectedImage !== null) {
      return (
        <View style={styles.container}>
          <Image
            source={{ uri: selectedImage.localUri }}
            style={styles.thumbnail}
          />
        </View>
      );
    }
    
  }


    return (
      <View style={{flex:1}}>
        <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={<RefreshControl progressBackgroundColor={'white'} refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <View style={{flex:0.5,}}>
            <AnimatedLottieView
              style={{height:250, width:250,marginTop:175, marginTop:12}}

              source={require('../../../assets/30173-welcome-screen.json')}
              autoPlay
            />

            <Button title='Pick' onPress={openImagePickerAsync}/>
          </View>

          <View style={{flex:0.5}}>
            <Image
              source={{ uri: selectedImage.localUri }}
              style={styles.thumbnail}
            />
          </View>
        </ScrollView>
      </View>
    )
}

export default Statistics


const styles = StyleSheet.create({
  /* Other styles hidden to keep the example brief... */
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain"
  },
  scrollView:{
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
