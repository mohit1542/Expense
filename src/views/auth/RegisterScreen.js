import React, { useState } from "react";
import {
  Text,
  View,
  Button,
  Alert,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Parse from "parse/react-native.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize(
  "PPeAzbb69YA9r151tP8oEa5308CSn2XNz5eweCXZ",
  "jtO82lSQGgeXVb3jX0gKm7SMHIwY2booxogq7RbT"
);
Parse.serverURL = "https://parseapi.back4app.com/";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      "You are Registered Successfully!",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  const registerUser = async () => {
    const Name = name;
    const Password = password;

    return await Parse.User.signUp(Name, Password, { email: email })
      .then((createdUser) => {
        console.log(
          "registered",
          //`User ${createdUser.getUsername()} was successfully created!`,
          navigation.navigate("MainNavigator")
        );

        showToastWithGravity();
        return true;
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
        return false;
      });
  };

  return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <Text style={{ marginTop: '35%', fontWeight: "bold" }}>Name</Text>
        <TextInput
          style={{
            marginTop: 5,
            width: "90%",
            paddingHorizontal: 8,
            paddingBottom: 8,
            backgroundColor: "white",
          }}
          label={"Name"}
          mode={"outlined"}
          selectionColor={"skyblue"}
          activeOutlineColor={"grey"}
          onChangeText={(text) => setName(text)}
          value={name}
          maxLength={50}
        />

        <Text style={{ fontWeight: "bold", marginTop: 15 }}>Email</Text>
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

        <Text style={{ marginTop: 15, fontWeight: "bold" }}>Password</Text>
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
            registerUser();
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
              marginTop: "2%",
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Register</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={{ fontSize: 18 }}>Go to Login Page</Text>
        </TouchableOpacity>

      </View>
  );
};

export default RegisterScreen;
