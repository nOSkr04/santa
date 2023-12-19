import { Image } from "expo-image";
import React, { memo, useEffect } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const AnimatedImage = Animated.createAnimatedComponent(Image);

type Props = {
  width?: number;
  height?: number;
};

const Loading = memo(({ width = 50, height = 50 }: Props) => {
  const angle = useSharedValue(0);

  useEffect(() => {
    angle.value = withRepeat(
      withTiming(360, { duration: 2000, easing: Easing.linear }),
      -1,
    );
  }, [angle]);

  const rotateStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${angle.value}deg` }],
    width    : width,
    height   : height,
  }));

  return (
    <AnimatedImage
      source={{
        uri: "https://images.pexels.com/photos/18578343/pexels-photo-18578343/free-photo-of-a-woman-in-a-white-dress-and-hat-walking-through-a-field.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      }}
      style={rotateStyle}
    />
  );
});

Loading.displayName = "Loading";

export { Loading };
