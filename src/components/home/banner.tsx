import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo } from "react";
import { Image } from "expo-image";
import { Colors } from "../../constants/colors";
import { CountDown } from "./count-down";

const width = Dimensions.get("window").width;

const Banner = memo(() => {
    const targetDateTime = new Date("2023-12-31T13:00:00");
    return (
      <View style={styles.container}>
        <Image  contentFit='contain' source={require("../../assets/app/banner.png")} style={styles.image}  />
        <Text style={styles.title}>Хугацаа:</Text>
        <CountDown targetDateTime={targetDateTime}    />
        <View style={styles.h10}  />
        <View style={styles.h10}  />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonTitle}>Өндөг авах </Text>
        </TouchableOpacity>
      </View>
    );
  });

Banner.displayName = "Banner";
export { Banner };

const styles = StyleSheet.create({
    image: {
        height  : width - 110,
        width   : width,
        position: "absolute",
    },
    container: {
      height        : width - 110,
      alignItems    : "center",
      justifyContent: "center"
    },
    title: {
      fontFamily: "MonSemiBold",
      fontSize  : 16,
      color     : Colors.white,
  },
  countDown: {
      fontSize : 18,
      textAlign: "center",
      color    : Colors.white,
  },
  button: {
      backgroundColor  : Colors.third,
      alignItems       : "center",
      justifyContent   : "center",
      paddingVertical  : 8,
      borderRadius     : 8,
      paddingHorizontal: 20,

  },
  buttonTitle: {
      fontSize: 16,
      color   : Colors.white
  },
  h10: {
    height: 10
  }
});