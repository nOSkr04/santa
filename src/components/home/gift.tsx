import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo,  } from "react";
import { Image } from "expo-image";
import { Colors } from "../../constants/colors";
import { IGift } from "../../interfaces/gift";
import { useNavigation } from "@react-navigation/native";
import { NavigationRoutes } from "../../navigation/types";

const width = Dimensions.get("window").width;

const GiftCard = memo(({ item }: { item: IGift }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={()=> navigation.navigate(NavigationRoutes.BuyEggScreen, { sideBar: false })} style={styles.container}>
      <Image placeholder={item.image.blurHash} source={item.image.url} style={styles.image} />
      <Text style={styles.title}>{item.name}</Text>
      <View style={styles.type}>
        <Text style={styles.typeText}>{item.type}</Text>
      </View>
    </TouchableOpacity>
  );
});

GiftCard.displayName = "GiftCard";

export { GiftCard };

const styles = StyleSheet.create({
  container: {
    borderRadius   : 8,
    backgroundColor: Colors.white,
    // shadowColor    : Colors.black,
    // shadowOffset   : {
    //   width : 0,
    //   height: 2,
    // },
    // shadowOpacity : 0.25,
    // shadowRadius  : 3.84,
    // elevation     : 5,
    justifyContent : "space-between",
    paddingBottom  : 8,
    shadowColor    : Colors.black,
    shadowOffset   : {
      width : 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius : 16.00,
    
    elevation: 24,
  },
  image: {
    width       : width/ 2 - 20,
    borderRadius: 8,
    height      : width/ 2 - 20
  },
  title: {
    fontSize         : 16,
    color            : Colors.black,
    fontFamily       : "MonBold",
    paddingHorizontal: 5,
    paddingTop       : 5,
  },
  type: {
    fontSize       : 12,
    backgroundColor: Colors.primary,
    borderRadius   : 8,
    padding        : 5,
    position       : "absolute",
    right          : 5,
    top            : 5
  },
  typeText: {
    fontSize  : 12,
    color     : Colors.white,
    fontFamily: "MonSemiBold",
  }
});