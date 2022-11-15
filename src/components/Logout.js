import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { auth } from "../../firebase";

const Logout = ({ navigation }) => {
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };
  useEffect(() => {
    handleSignOut();
  }, []);
};

export default Logout;
