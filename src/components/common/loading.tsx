import { Image } from "expo-image";
import React, { memo, useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { Colors } from "../../constants/colors";

const AnimatedImage = Animated.createAnimatedComponent(Image);

type Props = {
  width?: number;
  height?: number;
  title?: boolean
};

const Loading = memo(({ width = 100, height = 100,title }: Props) => {
  const angle = useSharedValue(0);
  const fade = useSharedValue(0);

  useEffect(() => {
    angle.value = withRepeat(
      withTiming(360, { duration: 2000, easing: Easing.linear }),
      -1,
    );
    fade.value = withRepeat(
      withTiming(1, { duration: 2000 }),
      -1
    );
  }, [angle, fade]);

  const rotateStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${angle.value}deg` }],
    width    : width,
    height   : height * 2,
  }));

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: fade.value
  }));

  return (
    <>
      <AnimatedImage
      contentFit={"contain"}
      source={require("../../assets/img/loading-image.png")}
      style={rotateStyle}
      />
      {title && 
        <Animated.Text style={[styles.title,animatedStyle]}>Уншиж байна.....</Animated.Text>
      }
    </>
  );
});

Loading.displayName = "Loading";

export { Loading };

const styles = StyleSheet.create({
  title: {
    fontFamily: "MonBold",
    fontSize  : 18,
    color     : Colors.white

  }
});
