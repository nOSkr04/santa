import {
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from "react-native";
import React, { memo } from "react";
import Animated, {
  SharedValue,
  interpolateColor,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import AntDesign from "@expo/vector-icons/AntDesign";
import { NavigationRoutes } from "../../navigation/types";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../constants/colors";
type Props = {
  dataLength: number;
  flatListIndex: SharedValue<number>;
  flatListRef: any;
  x: SharedValue<number>;
};

const CustomButton = memo(
  ({ flatListRef, flatListIndex, dataLength, x }: Props) => {
    const navigation = useNavigation();
    const { width: SCREEN_WIDTH } = useWindowDimensions();

    const buttonAnimationStyle = useAnimatedStyle(() => {
      return {
        width:
          flatListIndex.value === dataLength - 1
            ? withSpring(140)
            : withSpring(60),
        height: 60,
      };
    });

    const arrowAnimationStyle = useAnimatedStyle(() => {
      return {
        width : 30,
        height: 30,
        opacity:
          flatListIndex.value === dataLength - 1
            ? withTiming(0)
            : withTiming(1),
        transform: [
          {
            translateX:
              flatListIndex.value === dataLength - 1
                ? withTiming(100)
                : withTiming(0),
          },
        ],
      };
    });

    const textAnimationStyle = useAnimatedStyle(() => {
      return {
        opacity:
          flatListIndex.value === dataLength - 1
            ? withTiming(1)
            : withTiming(0),
        transform: [
          {
            translateX:
              flatListIndex.value === dataLength - 1
                ? withTiming(0)
                : withTiming(-100),
          },
        ],
      };
    });
    const animatedColor = useAnimatedStyle(() => {
      const backgroundColor = interpolateColor(
        x.value,
        [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH],
        ["#005b4f", "#1e2169", "#d62c2c"],
      );

      return {
        backgroundColor: backgroundColor,
      };
    });

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          if (flatListIndex.value < dataLength - 1) {
            flatListRef.current?.scrollToIndex({
              index: flatListIndex.value + 1,
            });
          } else {
            navigation.navigate(NavigationRoutes.LoginScreen);
          }
        }}>
        <Animated.View
          style={[styles.container, buttonAnimationStyle, animatedColor]}>
          <Animated.Text style={[styles.textButton, textAnimationStyle]}>
            Эхлэх
          </Animated.Text>
          <Animated.View style={[styles.arrow, arrowAnimationStyle]}>
            <AntDesign color={Colors.white} name="right" size={24} />
          </Animated.View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  },
);

CustomButton.displayName = "CustomButton";

export { CustomButton };

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    padding        : 10,
    borderRadius   : 100,
    justifyContent : "center",
    alignItems     : "center",
    overflow       : "hidden",
  },
  arrow: {
    position      : "absolute",
    alignItems    : "center",
    justifyContent: "center"
  },
  textButton: {
    color     : Colors.white,
    fontSize  : 16, 
    position  : "absolute",
    fontFamily: "MonBold"
  },
});
