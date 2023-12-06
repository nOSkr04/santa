import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { OnboardingData } from "./data";
import LottieView from "lottie-react-native";
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
const width = Dimensions.get("window").width;

type Props = {
  item: OnboardingData;
  index: number;
  x: SharedValue<number>;
};

const BoardCard = memo(({ item, index, x }: Props) => {
  const itemContainer = () => {
    return {
      width,
    };
  };

  const textColor = () => {
    return {
      color: item.textColor,
    };
  };

  const backgroundColor = () => {
    return {
      backgroundColor: item.backgroundColor,
    };
  };

  const circleAnimation = useAnimatedStyle(() => {
    const scale = interpolate(
      x.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [1, 4, 4],
      Extrapolate.CLAMP,
    );
    return {
      transform: [{ scale: scale }],
    };
  });

  const lottieAnimationStyle = useAnimatedStyle(() => {
    const translateYAnimation = interpolate(
      x.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [200, 0, -200],
      Extrapolate.CLAMP,
    );
    return {
      transform: [{ translateY: translateYAnimation }],
    };
  });

  return (
    <View style={[styles.container, itemContainer()]}>
      <View style={styles.circleContainer}>
        <Animated.View
          style={[styles.circle, backgroundColor(), circleAnimation]}
        />
      </View>
      <Animated.View style={lottieAnimationStyle}>
        <LottieView
          source={item.animation}
          style={styles.lottie}
          autoPlay
          loop
        />
      </Animated.View>
      <Text style={[styles.title, textColor()]}>{item.text}</Text>
    </View>
  );
});

BoardCard.displayName = "BoardCard";

export { BoardCard };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 120,
  },
  lottie: {
    width: width * 0.9,
    height: width * 0.9,
  },
  title: {
    textAlign: "center",
    fontSize: 44,
    fontWeight: "bold",
    marginBottom: 10,
    marginHorizontal: 20,
  },
  circleContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  circle: {
    width,
    height: width,
    borderRadius: width / 2,
  },
});
