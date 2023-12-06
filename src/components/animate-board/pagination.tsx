import { StyleSheet, View } from "react-native";
import React, { memo } from "react";
import { SharedValue } from "react-native-reanimated";
import { OnboardingData } from "./data";
import Dot from "./dot";

type Props = {
  data: OnboardingData[];
  x: SharedValue<number>;
};
const Pagination = memo(({ data, x }: Props) => {
  return (
    <View style={styles.paginationContainer}>
      {data.map((_, index) => {
        return <Dot index={index} x={x} key={index} />;
      })}
    </View>
  );
});

Pagination.displayName = "Pagination";

export { Pagination };

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: "row",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
