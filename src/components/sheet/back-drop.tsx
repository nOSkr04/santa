import React, { useMemo } from "react";
import { Pressable, StyleSheet } from "react-native";
import { BottomSheetBackdropProps, useBottomSheet } from "@gorhom/bottom-sheet";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Colors } from "../../constants/colors";

const SheetBackdrop = React.memo(
  ({ animatedIndex }: BottomSheetBackdropProps) => {
    const { close } = useBottomSheet();
    const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

    const opacityStyle = useAnimatedStyle(() => ({
      zIndex : animatedIndex.value > -1 ? 0 : -1,
      opacity: interpolate(
        animatedIndex.value,
        [-1, 0],
        [0, 0.55],
        Extrapolate.CLAMP,
      ),
    }));

    const animatedStyle = useMemo(
      () => [
        styles.container,
        {
          backgroundColor: Colors.black,
        },
        opacityStyle,
      ],
      [opacityStyle],
    );

    const handleOnPress = React.useCallback(() => {
      close();
    }, [close]);

    return <AnimatedPressable onPress={handleOnPress} style={animatedStyle} />;
  },
);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius : 10,
    borderTopRightRadius: 10,
    overflow            : "hidden",
    backgroundColor     : Colors.primary,
  },
});

SheetBackdrop.displayName = "SheetBackdrop";

export { SheetBackdrop };
