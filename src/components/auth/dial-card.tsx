import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { memo, useCallback } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { dialPad } from "./dial-pad";
import { Colors } from "../../constants/colors";
const { width } = Dimensions.get("window");
const dialPadSize = width * 0.2;
const dialPadTextSize = dialPadSize * 0.4;
const DialCard = memo(
  ({
    item,
    onPress,
  }: {
    item: string | number;
    onPress: (item: (typeof dialPad)[number]) => void;
  }) => {
    const borderStyle = useCallback(() => {
      return {
        borderWidth: item === "" ? 0 : 1,
      };
    }, [item]);
    return (
      <TouchableOpacity
        disabled={item === ""}
        onPress={() => {
          onPress(item);
        }}
      >
        <View style={[styles.container, borderStyle()]}>
          {item === "del" ? (
            <Ionicons
              color={"black"}
              name="backspace-outline"
              size={dialPadTextSize}
            />
          ) : (
            <Text style={styles.textStyle}>{item}</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  }
);

DialCard.displayName = "DialCard";

export { DialCard };

const styles = StyleSheet.create({
  container: {
    width         : dialPadSize,
    height        : dialPadSize,
    borderRadius  : dialPadSize,
    borderColor   : Colors.black,
    alignItems    : "center",
    justifyContent: "center",
  },
  textStyle: {
    fontSize: dialPadTextSize,
  },
});
