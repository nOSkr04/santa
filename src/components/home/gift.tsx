import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { memo,  } from "react";
import { Image } from "expo-image";
import { Colors } from "../../constants/colors";

const width = Dimensions.get("window").width;

const GiftCard = memo(({ item }: { item: any }) => {

  return (
    <View style={styles.container}>
      <Image placeholder={item.image.blurHash} source={item.image.url} style={styles.image} />
      <Text style={styles.title}>{item.name}</Text>
      <View style={styles.type}>
        <Text style={styles.typeText}>{item.type}</Text>
      </View>
    </View>
  );
});

GiftCard.displayName = "GiftCard";

export { GiftCard };

const styles = StyleSheet.create({
  container: {
    borderRadius   : 8,
    backgroundColor: Colors.white,
    shadowColor    : Colors.black,
    shadowOffset   : {
      width : 0,
      height: 2,
    },
    shadowOpacity : 0.25,
    shadowRadius  : 3.84,
    elevation     : 5,
    justifyContent: "space-between",
    paddingBottom : 8
  },
  image: {
    width       : width/ 2 - 20,
    borderRadius: 8,
    height      : width/ 2 - 20
  },
  title: {
    fontSize         : 16,
    color            : Colors.primary,
    fontFamily       : "MonBold",
    paddingHorizontal: 5,
    paddingTop       : 5,
  },
  type: {
    fontSize       : 12,
    backgroundColor: Colors.third,
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