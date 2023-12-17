import { Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo, useCallback, } from "react";
import { Image } from "expo-image";
import useSWR from "swr";
import { IUser } from "../../interfaces/user";
import { AuthApi, UserApi } from "../../api";
import { Colors } from "../../constants/colors";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { authLogout } from "../../store/auth-slice";
import Animated from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { NavigationRoutes } from "../../navigation/types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useToast } from "react-native-toast-notifications";
const DrawerContent = memo(() => {
  const navigation = useNavigation();
  const sf = useSafeAreaInsets();
  const dispatch = useDispatch();
  const toast = useToast();
  const email = "santa.contactus@gmail.com";
  const subject = "Санал хүсэлт";
  const body = "Агуулга";

  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
  const { data } = useSWR<IUser>("swr.user.me", async () => {
    const res = await UserApi.me();
    return res;
  });
  const top = useCallback(() => {
    return {
      marginTop: sf.top
    };
  }, [sf.top]);
  const bottom = useCallback(() => {
    return {
      marginBottom: sf.bottom + 10
    };
  }, [sf.bottom]);

  const onLogout = useCallback(async () => {
    try {
      await AuthApi.logout();
      dispatch(authLogout());
    } catch (err: any) {
      toast.show("Алдаа гарлаа", {
        type: "error",
        data: {
          title: err?.error?.message || "Алдаа гарлаа",
        },
        duration : 2000,
        placement: "top",
      });
    }
  }, [dispatch, toast]);

  const onNotification = useCallback(() => {
    navigation.navigate(NavigationRoutes.NotificationScreen);

    
    }, [navigation]);



  return (
    <View style={[styles.container, top()]}>
      <View>
        <View style={styles.userContainer}>
          <Image source={require("../../assets/mobile/ios.png")} style={styles.avatar} />
          <View style={styles.detailContainer}>
            <Text style={styles.phone}>{data?.phone}</Text>
            <Text style={styles.eggTitle}>{data?.eggCount || 0} өндөг</Text>
          </View>
        </View>
        <View style={styles.h24} />
        <TouchableOpacity onPress={() => navigation.navigate(NavigationRoutes.PrivacyScreen)} style={styles.content}>
          <MaterialIcons color={Colors.primary} name="privacy-tip" size={24} />
          <Animated.Text sharedTransitionTag="privacyText" style={styles.contentTitle}>Үйлчилгээний нөхцөл</Animated.Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate(NavigationRoutes.BuyEggScreen, { sideBar: true })} style={styles.content}>
          <MaterialCommunityIcons color={Colors.primary} name="egg-easter" size={24} />
          <Animated.Text sharedTransitionTag="addEgg21" style={styles.contentTitle}>Өндөг авах</Animated.Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate(NavigationRoutes.GiftEggScreen)} style={styles.content}>
          <MaterialCommunityIcons color={Colors.primary} name="gift" size={24} />
          <Animated.Text sharedTransitionTag="giftEgg" style={styles.contentTitle}>Өндөг бэлэглэх</Animated.Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => navigation.navigate(NavigationRoutes.BuyEggScreen, { sideBar: true })} style={styles.content}>
          <View style={styles.w5} />
          <FontAwesome color={Colors.primary} name="lock" size={24} />
          <View style={styles.w3} />
          <View>
            <Animated.Text style={styles.contentTitle}>Өндөг задлах</Animated.Text>
            <Animated.Text style={styles.contentDescription}>2024.01.01 01:00</Animated.Text>
          </View>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={onNotification} style={styles.contentRoot}>
          <View style={styles.content}>
            <MaterialCommunityIcons color={Colors.primary} name="notification-clear-all" size={24} />
            <Animated.Text sharedTransitionTag="notifficationTitle" style={styles.contentTitle}>Мэдэгдэл</Animated.Text>
          </View>
          {data?.notificationCount !== 0 &&
            <View style={styles.badgeContainer}>
              <Text style={styles.badge}>{data?.notificationCount || 0}</Text>
            </View>
          }
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          Linking.openURL(mailtoLink);
        }} style={styles.content} >
          <View style={styles.w3} />
          <MaterialCommunityIcons color={Colors.primary} name="email" size={20} />
          <View style={styles.w2} />
          <Text style={styles.contentTitle}>Холбоо барих</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.divider} />
        <TouchableOpacity onPress={onLogout} style={[styles.content, bottom()]}>
          <MaterialCommunityIcons color={Colors.primary} name="exit-run" size={24} />
          <Text style={styles.contentTitle}>Гарах</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
});

DrawerContent.displayName = "DrawerContent";

export { DrawerContent };

const styles = StyleSheet.create({
  container: {
    flex          : 1,
    paddingLeft   : 20,
    justifyContent: "space-between",
  },
  avatar: {
    width       : 56,
    height      : 56,
    borderRadius: 100,

  },
  phone: {
    fontSize  : 18,
    fontFamily: "MonSemiBold",
    color     : Colors.black,
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
    fontSize  : 14,
    color     : Colors.primary,
    fontFamily: "MonMedium",
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
    color     : Colors.black,
    fontFamily: "MonSemiBold",
    lineHeight: 24,
    marginLeft: 6,
  },
  contentDescription: {
    fontSize  : 12,
    color     : Colors.primary,
    fontFamily: "MonMedium",
    marginLeft: 6,
  },
  divider: {
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  bottomContainer: {

  },
  version: {
    textAlign   : "right",
    marginBottom: 18,
    marginTop   : 10,
    color       : Colors.black,
    fontFamily  : "MonBold",

  },
  contentRoot: {
    flexDirection : "row",
    alignItems    : "center",
    justifyContent: "space-between"
  },
  badgeContainer: {
    backgroundColor: Colors.primary,
    borderRadius   : 100,
  },
  badge: {
    fontSize         : 12,
    fontFamily       : "MonSemiBold",
    color            : Colors.white,
    paddingHorizontal: 8,
    paddingVertical  : 4
  },
  w5: {
    width: 5
  },
  w3: {
    width: 3
  },
  w2: {
    width: 2
  }
});
