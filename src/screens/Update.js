import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useRoute } from "@react-navigation/native";
import { db, storage } from "../../firebase";
const Update = ({ navigation }) => {
  const route = useRoute();
  const [newItem, setnewItem] = useState({
    name: null,
    offer_price: null,
    price: null,
    imageUrl: null,
  });
  const [list, setList] = useState([]);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const id = route.params.itemId;
  useEffect(() => {
    db.collection("Items")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((snapshot) => {
          let data = snapshot.data();
          let tempData = [...data.allItem];
          setList(tempData);
        });
      });
  }, []);
  useEffect(() => {
    console.log("====================================");
    console.log(list);
    console.log("====================================");
  }, [list]);

  const DeleteUsers = () => {
    list.splice(route.params.itemId, 1);
    db.collection("Items")
      .doc("FE46nOIBSjyJEVmzbrIm")
      .set({
        allItem: list,
      })
      .then(() => {
        alert("item deleted");
        navigation.goBack("Home");
      });
  };
  const updateName = (text) => {
    const tempList = [...list];
    tempList[id].name = text;
    setList(tempList);
  };
  const updatePrice = (text) => {
    const tempList = [...list];
    tempList[id].price = text;
    setList(tempList);
  };
  const updateOfferPrice = (text) => {
    const tempList = [...list];
    tempList[id].offer_price = text;
    setList(tempList);
  };
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
      const tempList = [...list];
      tempList[id].imageUrl = source;
      setList(tempList);
    }
  };
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
  const UpdateItem = () => {
    db.collection("Items")
      .doc("FE46nOIBSjyJEVmzbrIm")
      .set({
        allItem: list,
      })
      .then(() => {
        alert("item updated");
        navigation.goBack("Home");
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="name"
          //   value={list[id].name}
          onChangeText={(text) => {
            updateName(text);
          }}
          style={styles.input}
        />
        <TextInput
          placeholder="price"
          //   value={list[id].price}
          keyboardType="number-pad"
          onChangeText={(text) => {
            updatePrice(text);
          }}
          style={styles.input}
        />
        <TextInput
          placeholder="offer price"
          //   value={list[id].offer_price}
          keyboardType="number-pad"
          onChangeText={(text) => {
            updateOfferPrice(text);
          }}
          style={styles.input}
        />
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        <Button title="upload updated photo" onPress={uploadImage} />
        <Pressable
          onPress={UpdateItem}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Update</Text>
        </Pressable>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable onPress={DeleteUsers} style={styles.button}>
          <Text style={styles.buttonText}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Update;

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
