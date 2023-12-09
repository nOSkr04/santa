import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo } from "react";
import { Image } from "expo-image";
import { Colors } from "../../constants/colors";
import { CountDown } from "./count-down";
import Animated from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { NavigationRoutes } from "../../navigation/types";

const width = Dimensions.get("window").width;

const Banner = memo(() => {
    const targetDateTime = new Date("2023-12-31T13:00:00");
    const navigaiton = useNavigation();
    return (
      <View style={styles.container}>
        <Image  contentFit='contain' source={require("../../assets/app/banner.png")} style={styles.image}  />
        <Text style={styles.title}>Хугацаа:</Text>
        <CountDown targetDateTime={targetDateTime}    />
        <View style={styles.h10}  />
        <View style={styles.h10}  />
        <TouchableOpacity onPress={() => navigaiton.navigate(NavigationRoutes.BuyEggScreen)} style={styles.button}>
          <Image  contentFit="contain" source={require("../../assets/app/gift2.png")} style={styles.giftIcon} />
          <View style={styles.w10}  />
          <Animated.Text sharedTransitionTag="addEgg" style={styles.buttonTitle}>Өндөг авах </Animated.Text>
          <View style={styles.w10}  />
          <Image  contentFit="contain" source={require("../../assets/app/gift3.png")} style={styles.giftIcon} />
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
      flexDirection    : "row",
      

  },
  buttonTitle: {
      fontSize  : 18,
      color     : Colors.white,
      fontFamily: "MonBold",
  },
  h10: {
    height: 10
  },
  giftIcon: {
    width : 32,
    height: 32,
  },
  w10: {
    width: 10
  }
});