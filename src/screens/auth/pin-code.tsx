import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { memo, useCallback, useEffect, useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Colors } from "../../constants/colors";
import { DialPad } from "../../components/auth/dial-pad";
import { Image } from "expo-image";
import { Text } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useDispatch } from "react-redux";
import { AuthApi } from "../../api";
import { authLogin, authLogout } from "../../store/auth-slice";
import { useToast } from "react-native-toast-notifications";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const width = Dimensions.get("window").width;

const AnimatedImage = Animated.createAnimatedComponent(Image);

const duration = 500;
export const pinLength = 4;
const pinContainerSize = width / 2;
const pinMaxSize = pinContainerSize / pinLength;
const pinSpacing = 10;
const pinSize = pinMaxSize - pinSpacing * 2;
const PinCodeScreen = memo(() => {
  const dispatch = useDispatch();
  const toast = useToast();
  const sv = useSharedValue(0);
  const sf= useSafeAreaInsets();

  const [code, setCode] = useState<number[]>([]);
  const onLogin = useCallback(async () => {
    sv.value = withRepeat(withTiming(1, { duration }), -1);
    const password = code.join("");
    try {
      const res = await AuthApi.checkLoginPassword(password);
      dispatch(authLogin(res));
    } catch (err: any) {
      toast.show("Алдаа", {
        type: "error",
        data: {
          title: err.error.message || "Алдаа",
        },
        duration : 2000,
        placement: "top",
      });
      setCode([]);
      sv.value = 0;
    }
  }, [code, dispatch, sv, toast]);

  const onLogout = useCallback(async () => {
    try {
      await AuthApi.logout();
      dispatch(authLogout());
    } catch (err: any) {
      toast.show("Алдаа", {
        type: "error",
        data: {
          title: err.error.message || "Алдаа",
        },
        duration : 2000,
        placement: "top",
      });
    }
  }, [dispatch, toast]);

  useEffect(() => {
    if (code.length === 4) {
      onLogin();
      return;
    }
  }, [code.length, onLogin]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${sv.value * 360}deg` }],
  }));

  const safeTop = useCallback(() => {
    return{
      marginTop: sf.top+ 10
    };
  },[sf.top]);

  return (
    <>
      <View style={[styles.appBar, safeTop()]}>
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
          <AnimatedImage contentFit="contain" source={require("../../assets/app/santa1.png")} style={[styles.headerImage, animatedStyle]} transition={500} />
          <Text style={styles.headerTitle}>Santa.mn</Text>
        </View>
        <View style={styles.pinRoot}>
          {[...Array(pinLength).keys()].map((i) => {
            const isSelected = !!code[i] || code[i] === 0;

            // eslint-disable-next-line react-hooks/rules-of-hooks
            const aniamtedStyle = useAnimatedStyle(() => {
              return {
                height: isSelected
                  ? withSpring(pinSize, {
                    duration: 800,
                  })
                  : withSpring(2, {
                    duration: 800,
                  }),
                marginBottom: isSelected
                  ? withSpring(pinSize / 2, {
                    duration: 800,
                  })
                  : withSpring(0, {
                    duration: 800,
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
    right           : 0,
  },
  appBarTitle: {
    fontFamily: "MonMedium",
    fontSize  : 16,
    color     : Colors.black,
  },
  // loader: {
  //   flex          : 1,
  //   alignItems    : "center",
  //   justifyContent: "center"
  // }
});
