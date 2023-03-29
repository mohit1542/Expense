import React, { useEffect, useState, Component } from "react";
import {
  Text,
  View,
  Button,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import Parse from "parse/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Loading, setLoading] = useState(false);
  const [isLogged, setIsLogged] = useState(null);

  if (Loading) {
    return (
      <View style={{ top: "50%" }}>
        <ActivityIndicator size={60} color="blue" />
      </View>
    );
  }

  const navigation = useNavigation();

  const userLogin = async function () {
    const Email = email;
    const Password = password;

    if (email.trim() == "" || password.trim() == "") {
      Alert.alert("Error!", "Input cannot be empty");
    } else if (password.trim().length < 8) {
      Alert.alert("Error!", "Password must be atleast 8 characters");
    } else {
      setLoading(true);

      return await Parse.User.logIn(Email, Password, { email: email })
        .then(async (loggedInUser) => {
          const currentUser = await Parse.User.currentAsync();
          console.log(loggedInUser === currentUser);

          if (currentUser !== null) {
            const jsonValue = JSON.stringify(loggedInUser);
            await AsyncStorage.setItem("KeepUserLoggedIn", jsonValue);
            navigation.reset({
              index: 0,
              routes: [{ name: "MainNavigator" }],
            });
            setLoading(false);
            setIsLogged(jsonValue);
            return jsonValue;
          }
          return true;
        })
        .catch((error) => {
          Alert.alert("Error", error.message);
          setLoading(false);
          return false;
        })
        .finally(() => {
          setEmail("");
          setPassword("");
          setLoading(false);
        });
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: "40%" }}>
        Email
      </Text>
      <TextInput
        style={{
          marginTop: 5,
          width: "90%",
          paddingHorizontal: 8,
          paddingBottom: 8,
          backgroundColor: "white",
        }}
        label={"Email"}
        mode={"outlined"}
        selectionColor={"skyblue"}
        activeOutlineColor={"grey"}
        keyboardType={"email-address"}
        right={<TextInput.Icon icon="email" />}
        onChangeText={(text) => setEmail(text)}
        value={email}
        maxLength={50}
        autoCapitalize="none"
      />

      <Text style={{ marginTop: 25, fontWeight: "bold", fontSize: 20 }}>
        Password
      </Text>
      <TextInput
        style={{
          marginTop: 5,
          width: "90%",
          paddingHorizontal: 8,
          paddingBottom: 8,
          backgroundColor: "white",
        }}
        label={"Password"}
        mode={"outlined"}
        selectionColor={"skyblue"}
        activeOutlineColor={"grey"}
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
        maxLength={50}
      />

      <TouchableOpacity
        onPress={() => {
          userLogin();
        }}
        style={{ marginBottom: 20, marginTop: 10 }}
      >
        <LinearGradient
          colors={["#08d4c4", "#01ab9d"]}
          style={{
            width: 200,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 50,
            flexDirection: "row",
            marginTop: "4%",
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Sign In</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Register")}
        style={{ marginBottom: 20, marginTop: 10 }}
      >
        <LinearGradient
          colors={["#08d4c4", "#01ab9d"]}
          style={{
            width: 200,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 50,
            flexDirection: "row",
            marginTop: "2%",
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Register</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}
