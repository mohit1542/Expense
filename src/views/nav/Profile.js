import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Parse, { Query } from "parse/react-native.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getActionFromState, useIsFocused, useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [Loading, setLoading] = useState(false);
  const [fetchImage, setFetchImage] = useState(null);
  const [refresh, setRefresh] = useState(false)



  const navigation = useNavigation();

  //profle photo
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    //console.log(result);

    if (!result.cancelled) {
      //setImage(result.uri);

      const imgsave = new Parse.Object("Gallery");
      imgsave.set("image", result);
      imgsave.set("username", username);
      imgsave.set("email", email)
      try {
        //Save the Object
        await imgsave.save()
        //alert('New object created with objectId: ' + result.id);
        //console.log("saved")
      } catch (error) {
        alert('Failed to create new object, with error code: ' + error.message);
      }

    }

  };


  //get image
  const imgfetchfunc = async () => {

    const currentUser = await Parse.User.currentAsync();
    const useremailfetch = currentUser.getEmail();
    const imagefetch = Parse.Object.extend('Gallery');
    const query = new Parse.Query(imagefetch);
    query.descending('updatedAt')
    query.contains('email', useremailfetch)
    try {
      //Query the soccerPlayers object using the objectId you've copied
      await query.find().then((results) => {
        const data = results.map((result) => ({
          image: result.get('image')
        }))
        setFetchImage(data[0].image.uri)
      })
      //console.log("this is fetched imag ",fetchImage)
    } catch (error) {
      //alert(`Failed to retrieve the object, with error code: ${error.message}`);
    } finally {
      setRefresh(false)
    }
  }

  useEffect(() => {
    imgfetchfunc()
  }, [fetchImage])

  const onRefresh = () => {
    setRefresh(true);
    imgfetchfunc();
  }


  useEffect(() => {

    async function getCurrentUser() {

      if (username === "") {
        const currentUser = await Parse.User.currentAsync();
        if (currentUser !== null) {
          setUsername(currentUser.getUsername());
          setEmail(currentUser.getEmail());
        }
      }
    }
    getCurrentUser();
  }, [username, email]);

  const doUserLogOut = async () => {
    setLoading(true);
    return await Parse.User.logOut()
      .then(async () => {
        const currentUser = await Parse.User.currentAsync();
        if (currentUser === null) {
          const rm = await AsyncStorage.removeItem("KeepUserLoggedIn");
          navigation.reset({
            index: 0,
            routes: [{ name: "AuthNavigator" }],
          });

          console.log("removed", rm);
          Alert.alert("Logout successfully");

          return true;
        }
      })
      .catch((error) => {
        Alert.alert("Error!", error.message);
        return false;
      })
      .finally(() => setLoading(false));
  };


  if (Loading) {
    return (
      <View style={{ top: "50%" }}>
        <ActivityIndicator size={60} color="blue" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 0.925 }}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
      >
        <View style={styles.profilePictureContainer}>
          <TouchableOpacity onPress={pickImage}>
            {fetchImage ? (
              fetchImage && <Image source={{ uri: fetchImage }} style={styles.profilePhoto} />
            ) : (
              <View style={styles.profilePhotoPlaceholder}>
                <Text style={styles.profilePhotoPlaceholderText}>
                  Tap to select profile photo
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* User Info */}
        <View style={styles.userInfoContainer}>
          <Text style={styles.userName}>{username}</Text>
          <Text style={styles.userEmail}>{email}</Text>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => doUserLogOut()}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
          <MaterialIcons name="logout" size={24} color="#fff" />
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    paddingVertical: 30,
  },
  profilePictureContainer: {
    borderRadius: 75,
    overflow: 'hidden',
    borderWidth: 5,
    borderColor: "grey",
    marginBottom: 20,
    marginTop: '5%'
  },
  userInfoContainer: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d9d9d9",
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000",
  },
  userEmail: {
    fontSize: 16,
    color: "#000",
  },
  logoutButton: {
    backgroundColor: "#000",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    marginRight: 10,
  },
  profilePhoto: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  profilePhotoPlaceholder: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#d9d9d9",
    justifyContent: "center",
    alignItems: "center",
  },
  profilePhotoPlaceholderText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default ProfileScreen;
