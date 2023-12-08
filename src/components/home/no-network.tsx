import { StyleSheet, Text } from "react-native";
import React, { memo, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Colors } from "../../constants/colors";

type Props = {
  isConnected: boolean | null;
};

const NoNetwork = memo(({ isConnected }: Props) => {
  const sf = useSafeAreaInsets();
  const height = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    paddingTop     : sf.top,
    height         : height.value,
    backgroundColor: Colors.danger,
    alignItems     : "center",
    justifyContent : "center",
    position       : "absolute",
    left           : 0,
    right          : 0,
    zIndex         : 5,
    width          : "100%"
  }));

  useEffect(() => {
    height.value = withTiming(60, {
      duration: 1000,
    });
  }, [height, isConnected]);

  return (
    <Animated.View style={animatedStyle}>
      <Text style={styles.title}>Та интернэт холболтоо шалгана уу</Text>
    </Animated.View>
  );
});

NoNetwork.displayName = "NoNetwork";

export { NoNetwork };

const styles = StyleSheet.create({
  title: {
    fontFamily: "MonBold",
    fontSize  : 16,
    color     : Colors.white,
  },
});
