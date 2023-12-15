import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Colors } from "../../constants/colors";
import { DialPad } from "../../components/auth/dial-pad";
import LottieView from "lottie-react-native";
import { Image } from "expo-image";
import { Text } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useDispatch } from "react-redux";
import { AuthApi } from "../../api";
import { authLogin, authLogout } from "../../store/auth-slice";
const width = Dimensions.get("window").width;


export const pinLength = 4;
const pinContainerSize = width / 2;
const pinMaxSize = pinContainerSize / pinLength;
const pinSpacing = 10;
const pinSize = pinMaxSize - pinSpacing * 2;
const PinCodeScreen = memo(() => {
  const animation = useRef(null);
  const dispatch = useDispatch();
  const [code, setCode] = useState<number[]>([]);
  const onLogin = useCallback(async () => {
    const password = code.join("");
    try {
      const res = await AuthApi.checkLoginPassword(password);
      dispatch(authLogin(res));
    } catch (err) {
      console.log(err);
    }
  }, [code, dispatch]);

  const onLogout = useCallback(async () => {
    try {
      await AuthApi.logout();
      dispatch(authLogout());
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

useEffect(() => {
  if(code.length === 4){
    onLogin();
    setCode([]);
    return;
  }
},[code.length, onLogin]);



return (
  <>
    <LottieView
      autoPlay
      ref={animation}
      source={require("../../assets/lottie/snow-animate.json")}
      style={styles.root}
    />
    <View style={styles.appBar}>
      <TouchableOpacity onPress={onLogout} style={styles.backButton}>
        <AntDesign color={Colors.black} name="left" size={24} />
      </TouchableOpacity>
      <Text style={styles.appBarTitle}>Пин код баталгаажуулалт</Text>
      <View style={styles.backButton}>
        <AntDesign color={Colors.white} name="left" size={24} />
      </View>
    </View>
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image contentFit="contain" source={require("../../assets/app/santa1.png")} style={styles.headerImage} transition={500} />
        <Text style={styles.headerTitle}>Santa.mn</Text>
      </View>
      <View style={styles.pinRoot}>
        {[...Array(pinLength).keys()].map((i) => {
          const isSelected = !!code[i] || code[i] === 0;

          // eslint-disable-next-line react-hooks/rules-of-hooks
          const aniamtedStyle = useAnimatedStyle(() => {
            return {
              height: isSelected
                ? withTiming(pinSize, {
                  duration: 100,
                })
                : withTiming(2, {
                  duration: 100,
                }),
              marginBottom: isSelected
                ? withTiming(pinSize / 2, {
                  duration: 100,
                })
                : withTiming(0, {
                  duration: 100,
                }),
              width       : pinSize,
              borderRadius: pinSize,
            };
          });
          return (
            <Animated.Image
              key={`pin-${i}`}
              source={require("../../assets/gift.png")}
              style={aniamtedStyle}
            />
          );
        })}
      </View>
      <DialPad code={code} setCode={setCode} />
    </View>
  </>
);
});

PinCodeScreen.displayName = "PinCodeScreen";

export { PinCodeScreen };

const styles = StyleSheet.create({
  container: {
    flex           : 1,
    backgroundColor: Colors.white,
    alignItems     : "center",
    justifyContent : "center",
  },
  pinRoot: {
    flexDirection: "row",
    gap          : pinSpacing * 2,
    marginBottom : 40,
    height       : pinSize * 2,
    alignItems   : "flex-end",
  },
  root: {
    flex         : 1,
    pointerEvents: "none",
    position     : "absolute",
    left         : 0,
    top          : 0,
    right        : 0,
    bottom       : 0,
    zIndex       : 2
  },
  headerContainer: {
    flexDirection : "row",
    alignItems    : "center",
    justifyContent: "center",
    zIndex        : 2

  },
  headerImage: {
    width : 48,
    height: 48,
  },
  headerTitle: {
    fontFamily: "MonBold",
    fontSize  : 28,
    color     : Colors.black,
  },
  backButton: {
    padding: 8
  },
  appBar: {
    flexDirection   : "row",
    marginHorizontal: 18,
    alignItems      : "center",
    justifyContent  : "space-between",
    zIndex          : 2,
    position        : "absolute",
    left            : 0,
    top             : 50,
    right           : 0,
  },
  appBarTitle: {
    fontFamily: "MonMedium",
    fontSize  : 16,
    color     : Colors.black,
  }
});
