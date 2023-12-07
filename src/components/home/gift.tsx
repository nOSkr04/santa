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
    borderWidth    : 1,
    borderColor    : Colors.white,
    borderRadius   : 8,
    backgroundColor: Colors.white
    
  },
  image: {
    width       : width/ 2 - 24,
    borderRadius: 8,
    height      : 150
  },
  title: {
    fontSize         : 16,
    color            : Colors.third,
    fontFamily       : "MonBold",
    paddingHorizontal: 5,
    paddingTop       : 5
  },
  type: {
    fontSize       : 12,
    backgroundColor: Colors.third,
    alignSelf      : "flex-end",
    borderRadius   : 8,
    marginTop      : 5,
    marginBottom   : 5,
    marginRight    : 5,
    padding        : 5
  },
  typeText: {
    fontSize  : 12,
    color     : Colors.white,
    fontFamily: "MonSemiBold",
  }
});