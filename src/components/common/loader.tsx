import React, { memo, useCallback, useRef } from "react";
import LottieView from "lottie-react-native";
import { StyleSheet, View } from "react-native";
import { Colors } from "../../constants/colors";
import Animated, { useAnimatedStyle, } from "react-native-reanimated";

type Props ={
     width?: number, height?: number, color?: string, size?: number,
}

const Loader = memo(({ width, height, color = Colors.primary, size = 18, }: Props) => {
    const animation = useRef(null);

    const dimension = useCallback(() => {
        return {
            width : width || 100,
            height: height || 100,
        };
    }, [height, width]);

    const sizes = useAnimatedStyle(() => {
        return {
            fontSize: size,
            color   : color
        };
    });


    return (
      <View style={styles.container}>
        <LottieView
        autoPlay
        ref={animation}
        source={require("../../assets/lottie/loading.json")}
        style={dimension()}
        />
        <Animated.Text style={[styles.title, sizes]}>Уншиж байна....</Animated.Text>
      </View>
    );
});

Loader.displayName = "Loader";

export { Loader };

const styles = StyleSheet.create({
    container: {
        alignItems    : "center",
        justifyContent: "center"
    },
    title: {
        fontFamily: "MonSemiBold",
        marginTop : 18
    }
});

