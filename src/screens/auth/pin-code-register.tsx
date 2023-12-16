import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { memo, useCallback, useEffect,  useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
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

export const pinLength = 4;
const duration = 500;
const pinContainerSize = width / 2;
const pinMaxSize = pinContainerSize / pinLength;
const pinSpacing = 10;
const pinSize = pinMaxSize - pinSpacing * 2;
const PinCodeRegisterScreen = memo(() => {
  const dispatch = useDispatch();
  const sv = useSharedValue(0);
  const sf=  useSafeAreaInsets();
  const toast = useToast();
  const [code, setCode] = useState<number[]>([]);
  const onLogin = useCallback(async () => {
    sv.value = withRepeat(withTiming(1, { duration }), -1);
    const password = code.join("");
    try {
      const res = await AuthApi.checkRegisterPassword(password);
      dispatch(authLogin(res));
    } catch (err: any) {
      sv.value = 0;
      setCode([]);
      toast.show("Алдаа", {
        type: "error",
        data: {
          title: err.error.message || "Алдаа",
        },
        duration : 2000,
        placement: "top",
      });
    }
  }, [code, dispatch, sv, toast]);
  const onLogout = useCallback(async () => {
    sv.value = withRepeat(withTiming(1, { duration }), -1);
    try {
      await AuthApi.logout();
      await AuthApi.deleteUser();
      dispatch(authLogout());
      setCode([]);
    } catch (err: any) {
      toast.show("Алдаа", {
        type: "error",
        data: {
          title: err.error.message || "Алдаа",
        },
        duration : 2000,
        placement: "top",
      });
      sv.value = 0;
    }
    setCode([]);
  }, [dispatch, sv, toast]);

  useEffect(() => {
    if (code.length === 4) {
      onLogin();
      return;
    }
  }, [code.length,  onLogin]);

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
        <Text style={styles.appBarTitle}>Пин код үүсгэх</Text>
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

PinCodeRegisterScreen.displayName = "PinCodeRegisterScreen";

export { PinCodeRegisterScreen };

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
    right           : 0,
  },
  appBarTitle: {
    fontFamily: "MonMedium",
    fontSize  : 16,
    color     : Colors.black,
  }
});
