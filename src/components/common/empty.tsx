import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { Colors } from "../../constants/colors";

const width = Dimensions.get("screen").width;

type Props = {
  title: string;
  description: string;
};
const EmptyCard = ({ title, description }: Props) => {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/img/Letter-min.png")} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

export { EmptyCard };

const styles = StyleSheet.create({
  container: {
    flex          : 1,
    alignItems    : "center",
    justifyContent: "center",
  },
  image: {
    width : width * 0.6,
    height: width * 0.6,
  },
  title: {
    fontSize  : 28,
    textAlign : "center",
    fontFamily: "MonBold",
    color     : Colors.primary,
  },
  description: {
    marginTop : 8,
    fontSize  : 14,
    fontFamily: "MonMedium",
    color     : Colors.text2,
  },
});
