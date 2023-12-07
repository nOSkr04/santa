import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo } from "react";
import { Image } from "expo-image";
import Constants from "expo-constants";
import { Colors } from "../../constants/colors";
import { CountDown } from "./count-down";

const width = Dimensions.get("window").width;

const Banner = memo(() => {
    const targetDateTime = new Date("2023-12-31T13:00:00");
    return (
      <View style={styles.container}>
        <Image  contentFit='cover' source={require("../../assets/imgs/banner.jpg")} style={styles.image}  />
        <Text style={styles.title}>Өндөг задрах хугацаа</Text>
        <CountDown targetDateTime={targetDateTime}    />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonTitle}>Өндөг авах {Constants.expoConfig?.version} 1</Text>
        </TouchableOpacity>
      </View>
    );
  });

Banner.displayName = "Banner";
export { Banner };

const styles = StyleSheet.create({
    container: {
        height          : 360,
        borderRadius    : 20,
        zIndex          : 1,
        marginHorizontal: 12,
        width           : width,
        marginTop       : 8,
    },
    image: {
        zIndex      : 1,
        height      : 360,
        width       : width- 24,
        borderRadius: 20,
    },
    title: {
        fontFamily: "MonSemiBold",
        fontSize  : 16,
        color     : Colors.white,
        position  : "absolute",
        zIndex    : 2,
        top       : 20,
        left      : 22
    },
    countDown: {
        fontFamily: "MonBold",
        fontSize  : 18,
        textAlign : "center",
        color     : Colors.white,
        position  : "absolute",
        zIndex    : 2,
        top       : 40,
        left      : 44
    },
    button: {
        position       : "absolute",
        bottom         : 10,
        zIndex         : 4,
        backgroundColor: Colors.third,
        right          : 52,
        left           : 26,
        alignItems     : "center",
        justifyContent : "center",
        paddingVertical: 8,
        borderRadius   : 16,
    },
    buttonTitle: {
        fontSize: 16,
        color   : Colors.white
    }
});