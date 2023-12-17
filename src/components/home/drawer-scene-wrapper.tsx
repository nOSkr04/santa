import { StyleSheet,  } from "react-native";
import React, { ReactNode, memo,   } from "react";
import {  useDrawerProgress } from "react-native-drawer-layout";
import Animated, {   interpolate, useAnimatedStyle,    } from "react-native-reanimated";
import { Colors } from "../../constants/colors";

const DrawerSceneWrapper = memo(({ children }: {children:ReactNode}) => {
  const progress=  useDrawerProgress();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: interpolate(progress.value, [0,1], [1,0.8], "clamp") },
      { perspective: 1000 },
      { rotateY: `${interpolate(progress.value, [0,1], [0,-10], "clamp")}deg` },
      { translateX: interpolate(progress.value, [0,1], [0,0,-60], "clamp") }
    ],
    // borderRadius: withTiming(0,1)
    overflow: "hidden"
  }));


  return (
    <Animated.View style={[styles.container, animatedStyle, ]}>
      {children}
    </Animated.View>
  );
});

DrawerSceneWrapper.displayName="DrawerSceneWrapper";

export { DrawerSceneWrapper };

const styles = StyleSheet.create({
  container: {
    flex           : 1,
    backgroundColor: Colors.white,
  },
});