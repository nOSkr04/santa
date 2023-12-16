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
      <Image source={require("../../assets/img/joke.png")} style={styles.image} />
      <Text style={styles.title}>Өндөг задрах хугацаа:</Text>
      <CountDown targetDateTime={targetDateTime} />
      <View style={styles.h10} />
      <View style={styles.h10} />
      <TouchableOpacity onPress={() => navigaiton.navigate(NavigationRoutes.BuyEggScreen, { sideBar: false })} style={styles.button}>
        <Image contentFit="contain" source={require("../../assets/app/gift2.png")} style={styles.giftIcon} />
        <View style={styles.w10} />
        <Animated.Text sharedTransitionTag="addEgg" style={styles.buttonTitle}>Өндөг авах </Animated.Text>
        <View style={styles.w10} />
        <Image contentFit="contain" source={require("../../assets/app/gift3.png")} style={styles.giftIcon} />
      </TouchableOpacity>
    </View>
  );
});

Banner.displayName = "Banner";
export { Banner };

const styles = StyleSheet.create({
  image: {
    height          : "90%",
    width           : width - 24,
    position        : "absolute",
    borderRadius    : 12,
    marginHorizontal: 12,
  },
  container: {
    height        : width - 140,
    alignItems    : "center",
    justifyContent: "center",
    shadowColor   : Colors.black,
    shadowOffset  : {
      width : 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius : 16.00,
    
    elevation: 24,
  },
  title: {
    fontFamily  : "MonSemiBold",
    fontSize    : 24,
    color       : Colors.white,
    marginBottom: 10,
    shadowColor : Colors.white,
    shadowOffset: {
      width : 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius : 16.00,

    elevation: 24,
  },
  button: {
    backgroundColor  : Colors.white,
    alignItems       : "center",
    justifyContent   : "center",
    paddingVertical  : 8,
    borderRadius     : 8,
    paddingHorizontal: 20,
    flexDirection    : "row",
    shadowColor      : Colors.white,
    shadowOffset     : {
      width : 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius : 16.00,

    elevation: 24,

  },
  buttonTitle: {
    fontSize  : 18,
    color     : Colors.black,
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