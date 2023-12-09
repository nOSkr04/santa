import {  Platform, StyleSheet,Text,TouchableOpacity, View } from "react-native";
import React, { memo, useCallback } from "react";
import { Image } from "expo-image";
import useSWR from "swr";
import { IUser } from "../../interfaces/user";
import { AuthApi, UserApi } from "../../api";
import { Colors } from "../../constants/colors";
import { FontAwesome ,MaterialCommunityIcons,MaterialIcons  } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { authLogout } from "../../store/auth-slice";
import Constants from "expo-constants";
import Animated from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { NavigationRoutes } from "../../navigation/types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const DrawerContent = memo(() => {
  const navigation = useNavigation();
  const sf = useSafeAreaInsets();
  const dispatch = useDispatch();
  const { data } = useSWR<IUser>("swr.user.me", async() => {
    const res = await UserApi.me();
    return res;
  });

  const top = useCallback(() => {
    return {
      marginTop: sf.top
    };
  },[sf.top]);

  const onLogout = useCallback(async() => {
    try{
      await AuthApi.logout();
      dispatch(authLogout());
    } catch(err){
      console.log(err);
    }
  },[dispatch]);

    return (
      <View style={[styles.container, top()]}>
        <View>
          <View style={styles.userContainer}>
            <Image source={require("../../assets/app/logo.png")}  style={styles.avatar}  />
            <View style={styles.detailContainer}>
              <Text style={styles.phone}>{data?.phone}</Text>
              <Text style={styles.eggTitle}>{data?.eggCount || 0} өндөг</Text>
            </View>
          </View>
          <View style={styles.h24}  />
          <TouchableOpacity onPress={() => navigation.navigate(NavigationRoutes.PrivacyScreen)} style={styles.content}>
            <MaterialIcons color={Colors.white} name="privacy-tip" size={24} />
            <Animated.Text sharedTransitionTag="privacyText" style={styles.contentTitle}>Үйлчилгээний нөхцөл</Animated.Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate(NavigationRoutes.BuyEggScreen, { sideBar: true })} style={styles.content}>
            <MaterialCommunityIcons  color={Colors.white} name="egg-easter" size={24} />
            <Animated.Text sharedTransitionTag="addEgg2" style={styles.contentTitle}>Өндөг авах</Animated.Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate(NavigationRoutes.BuyEggScreen, { sideBar: true })} style={styles.content}>
            <FontAwesome   color={Colors.white} name="lock" size={24} />
            <View>
              <Animated.Text  style={styles.contentTitle}>Бэлэг</Animated.Text>
              <Animated.Text  style={styles.contentDescription}>2024.01.01 01:00</Animated.Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.content}>
            <MaterialCommunityIcons  color={Colors.white} name="phone" size={24} />
            <Text style={styles.contentTitle}>Холбоо барих</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.divider}  />
          <TouchableOpacity onPress={onLogout} style={styles.content}>
            <MaterialCommunityIcons  color={Colors.white} name="exit-run" size={24} />
            <Text style={styles.contentTitle}>Гарах</Text>
          </TouchableOpacity>
          <Text style={styles.version}>Загвар: {Platform.OS === "android" ?  Constants.expoConfig?.android?.versionCode : Constants.expoConfig?.ios?.buildNumber}</Text>
        </View>
      </View>
    );
  });

  DrawerContent.displayName="DrawerContent";

export { DrawerContent };

const styles = StyleSheet.create({
  container: {
    flex          : 1,
    paddingLeft   : 20,
    justifyContent: "space-between"
  },
  avatar: {
    width       : 48,
    height      : 48,
    borderRadius: 100,
  
  },
  phone: {
    fontSize  : 15,
    fontFamily: "MonSemiBold",
    color     : Colors.white,
    lineHeight: 24
  },
  userContainer: {
    flexDirection: "row",
    alignItems   : "center",
    marginTop    : 24
  },
  detailContainer: {
    marginLeft: 12
  },
  eggTitle: {
    fontSize  : 12,
    color     : Colors.background,
    fontFamily: "MonMedium",
    lineHeight: 12
  },
  content: {
    flexDirection: "row",
    alignItems   : "center",
    padding      : 12
  },
  h24: {
    height: 24
  },
  contentTitle: {
    fontSize  : 15,
    color     : Colors.white,
    fontFamily: "MonSemiBold",
    lineHeight: 24,
    marginLeft: 6,
  },
  contentDescription: {
    fontSize  : 12,
    color     : Colors.white,
    fontFamily: "MonMedium",
    marginLeft: 6,
  },
  divider: {
    borderWidth: 1,
    borderColor: Colors.background,
  },
  bottomContainer: {
   
  },
  version: {
    textAlign   : "right",
    marginBottom: 18,
    marginTop   : 10,
    color       : Colors.white,
    fontFamily  : "MonBold",

  }
});
