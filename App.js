import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import UserPanel from "./src/screens/UserPanel";
import Logout from "./src/components/Logout";
import Update from "./src/screens/Update";
import store from "./src/redux/store";

import Assignment from "./Assignment";
import { db } from "./firebase";
import { show } from "./src/redux/action";
export default function App() {
  useEffect(() => {
    db.collection("Items")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((snapshot) => {
          let data = snapshot.data();
          let tempData = [...data.allItem];
          store.dispatch(show(tempData));
        });
      });
  }, []);
  return <Assignment />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
