import {  Dimensions, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { memo, useRef,  } from "react";
import { BackAppBar } from "../../components/header/back-app-bar";
import { Colors } from "../../constants/colors";
import { Image } from "expo-image";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationRoutes } from "../../navigation/types";
const width = Dimensions.get("window").width;


const GiftEggScreen = memo(() => {
    const animate = useRef(null);
    const navigaiton = useNavigation();

    const onPress = async () => {
        console.log("first");
        navigaiton.navigate(NavigationRoutes.GiftEggBuyScreen);
    };

    return (
      <>
        <BackAppBar sharedTag={"giftEgg"} title="Өндөг бэлэглэх" />
        <View style={styles.divider} />
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.root}>
          <ScrollView contentContainerStyle={styles.container}>
            <LottieView
                            autoPlay
                            ref={animate}
                            source={require("../../assets/lottie/snow-animate.json")}
                            style={styles.root}
                        />

            <View style={styles.shadowImage}>
              <Image contentFit="contain" source={require("../../assets/img/gift.png")} style={styles.image} />
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.label}>Бэлэг авах дугаар</Text>
              <TextInput cursorColor={Colors.white} placeholder="Утасны дугаар" style={styles.input} />


              <TouchableOpacity onPress={onPress} style={styles.submit}>
                <Text style={styles.primaryButton}>Үргэлжлүүлэх</Text>
              </TouchableOpacity>
              <View style={styles.h32} />

            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </>
    );
});

GiftEggScreen.displayName = "GiftEggScreen";

export { GiftEggScreen };

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    divider: {
        borderWidth: 1,
        borderColor: Colors.white,
    },
    container: {
        flex           : 1,
        backgroundColor: Colors.primary,
        justifyContent : "flex-end",
        alignItems     : "center"
    },
    image: {
        width : width * 0.85,
        height: width * 0.85,
    },
    contentContainer: {
        backgroundColor: Colors.white,
        width,
        paddingVertical: 40,
    },
    eggTitle: {
        color         : Colors.black,
        fontFamily    : "MonBold",
        fontSize      : 20,
        textAlign     : "center",
        marginVertical: 20
    },
    eggContainer: {
        flexDirection   : "row",
        alignItems      : "center",
        justifyContent  : "space-between",
        marginHorizontal: 30
    },
    sumButton: {
        padding        : 8,
        backgroundColor: Colors.primary,
        borderRadius   : 8
    },
    input: {
        backgroundColor  : Colors.white,
        borderRadius     : 10,
        marginHorizontal : 24,
        marginTop        : 10,
        paddingVertical  : 14,
        paddingHorizontal: 8,
        shadowColor      : Colors.black,
        shadowOffset     : {
            width : 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius : 16.00,

        elevation: 24,
    },
    buttonRow: {
        flexDirection : "row",
        justifyContent: "space-around",
        alignItems    : "center",
        marginTop     : 28
    },
    rowButton: {
        borderRadius   : 8,
        padding        : 8,
        backgroundColor: Colors.white,
        borderWidth    : 1,
        borderColor    : Colors.black
    },
    rowButtonTitle: {
        fontSize  : 14,
        fontFamily: "MonSemiBold",
        color     : Colors.black,

    },
    submit: {
        borderRadius     : 8,
        padding          : 12,
        backgroundColor  : Colors.primary,
        alignSelf        : "flex-end",
        marginRight      : 15,
        marginTop        : 50,
        paddingHorizontal: 40,
        right            : 10
    },
    h32: {
        height: 32
    },
    shadowImage: {
        shadowColor : Colors.white,
        shadowOffset: {
            width : 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius : 16.00,

        elevation: 24,
    },
    primaryButton: {
        fontSize  : 14,
        fontFamily: "MonSemiBold",
        color     : Colors.white,
    },

    label: {
        fontFamily: "MonMedium",
        fontSize  : 14,
        color     : Colors.black,
        marginLeft: 24
    },

});
