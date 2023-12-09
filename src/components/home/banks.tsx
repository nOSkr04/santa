import { Dimensions, Linking, Pressable, StyleSheet, Text,  } from "react-native";
import React, { memo } from "react";
import { IBank } from "../../interfaces/bank";
import { Image } from "expo-image";
import { Colors } from "../../constants/colors";

const width = Dimensions.get("window").width;

const Banks = memo(({ item }: {item: IBank}) => {
    return (
      <Pressable onPress={() => Linking.openURL(`${item.link}`)} style={styles.container}>
        <Image source={item.logo} style={styles.logo}  />
        <Text style={styles.title}>{item.name}</Text>
      </Pressable>
    );
  });

  Banks.displayName="Banks";

export { Banks };

const styles = StyleSheet.create({
    logo: {
        width       : 80,
        height      : 80,
        borderRadius: 8,
    },
    container: {
        alignItems  : "center",
        width       : width / 3- 16,
        marginTop   : 5,
        borderWidth : 1,
        borderColor : Colors.border,
        borderRadius: 8,
        padding     : 8,
    },
    title: {
        color     : Colors.black,
        fontFamily: "MonMedium",
        fontSize  : 14,
        textAlign : "center",
        marginTop : 8
    }
});