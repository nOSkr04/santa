import { FlatList, StyleSheet } from "react-native";
import React, { memo,  } from "react";
import { DialCard } from "./dial-card";

export const dialPad = [1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "del"];

const _spacing = 20;

type Props = {
  setCode: React.Dispatch<React.SetStateAction<number[]>>;
  code: number[];
};

const DialPad = memo(({ setCode, code, }: Props) => {
  const renderDialPad = 
    ({ item }: { item: string | number }) => {
      return (
        <DialCard
          item={item}
          onPress={(item: string | number) => {
            if (item === "del") {
              setCode((prevCode) => prevCode.slice(0, prevCode.length - 1));
            } else if (code.length === 4) {
              return;
            } else if (typeof item === "number") {
              setCode((prevcode) => [...prevcode, item]);
            }
          }}
        />
      );
    };
  //
  return (
    <FlatList
      columnWrapperStyle={styles.gap}
      contentContainerStyle={styles.gap}
      data={dialPad}
      keyExtractor={(_, index) => index.toString()}
      numColumns={3}
      renderItem={renderDialPad}
      scrollEnabled={false}
      style={styles.container}
    />
  );
});

DialPad.displayName="DialPad";

export { DialPad };
const styles = StyleSheet.create({
  gap: {
    gap: _spacing,
  },
  container: {
    flexGrow: 0,
  },
});
