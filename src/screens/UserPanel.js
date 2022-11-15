import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { db, storage } from "../../firebase";
import * as ImagePicker from "expo-image-picker";
const UserPanel = ({ allItem, setItems }) => {
  const [list, setList] = useState([]);
  const [newItem, setnewItem] = useState({
    name: null,
    offer_price: null,
    price: null,
    imageUrl: null,
  });
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      const source = { uri: result.assets[0].uri };
      console.log("====================================");
      console.log(source);
      console.log("====================================");
      setImage(source);
      setnewItem({ ...newItem, imageUrl: source });
    }
  };
  useEffect(() => {
    db.collection("Items")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((snapshot) => {
          let data = snapshot.data();
          console.log(data.allItem);
          let tempData = [...data.allItem];
          setList(tempData);
        });
      });
  }, []);
  const uploadImage = async () => {
    setUploading(true);
    const response = await fetch(image.uri);
    const blob = await response.blob();
    const filename = image.uri.substring(image.uri.lastIndexOf("/") + 1);
    var ref = storage.ref().child(filename).put(blob);

    try {
      await ref;
    } catch (e) {
      console.log("====================================");
      console.log(e);
      console.log("====================================");
    }
    setUploading(false);
    Alert.alert("photo uploaded");
    setImage(null);
  };
  const handleAddItem = () => {
    uploadImage();
    const addItem = {
      name: newItem.name,
      offer_price: newItem.offer_price,
      price: newItem.price,
      imageUrl: newItem.imageUrl,
    };
    const tempList = [...list, addItem];
    setList(tempList);

    db.collection("Items").doc("FE46nOIBSjyJEVmzbrIm").set({
      allItem: list,
    });
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="name"
          value={newItem.name}
          onChangeText={(text) => setnewItem({ ...newItem, name: text })}
          style={styles.input}
        />
        <TextInput
          placeholder="price"
          keyboardType="number-pad"
          value={newItem.price}
          onChangeText={(text) => setnewItem({ ...newItem, price: text })}
          style={styles.input}
        />
        <TextInput
          placeholder="offer price"
          keyboardType="number-pad"
          value={newItem.offer_price}
          onChangeText={(text) => setnewItem({ ...newItem, offer_price: text })}
          style={styles.input}
        />
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        <Button title="upload image" onPress={uploadImage} />
      </View>
      <View style={styles.buttonContainer}>
        <Pressable onPress={handleAddItem} style={styles.button}>
          <Text style={styles.buttonText}>Add Item</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default UserPanel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
});
