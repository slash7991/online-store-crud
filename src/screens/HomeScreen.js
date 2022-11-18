import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import imageu from "../../assets/image/shoe.png";
import { CardViewWithImage } from "react-native-simple-card-view";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import store from "../redux/store";
const HomeScreen = ({ navigation }) => {
  console.log("====================================");
  console.log("redux=>", store.getState().allItem);
  console.log("====================================");
  const [allItem, setItems] = useState([]);
  const isFocused = useIsFocused();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {store.getState().allItem.map((item, index) => {
        return (
          <CardViewWithImage
            key={index}
            width={300}
            content={"Price " + item.price + " Offer price " + item.offer_price}
            source={{ uri: item.imageUrl.uri }}
            title={item.name}
            imageWidth={100}
            imageHeight={100}
            onPress={() =>
              navigation.navigate("Update", {
                itemId: index,
              })
            }
            roundedImage={true}
            roundedImageValue={50}
            imageMargin={{ top: 10 }}
          />
        );
      })}
      <Text></Text>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
