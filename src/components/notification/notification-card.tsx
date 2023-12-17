import { StyleSheet, Text, View } from "react-native";
import React, { memo, useCallback } from "react";
import { INotification } from "../../interfaces/notification";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";
const NotificationCard = memo(({ item }: {item:INotification}) => {

  const readIt = useCallback(() => {
    if(item.isRead){
    return{
      backgroundColor: Colors.white,
      borderColor    : Colors.border,
    };
  }
  return{};
  },[item.isRead]);

    return (
      <View style={[styles.container,readIt()]}>
        <View style={styles.iconContainer}>
          <MaterialIcons color={Colors.white} name="message" size={24} />
        </View>
        <View style={styles.contentContainer}>
          <Text>{item.title}</Text>
        </View>
      </View>
    );
  });

  NotificationCard.displayName="NotificationCard";

export { NotificationCard };

const styles = StyleSheet.create({
  container: {
    padding         : 16,
    flexDirection   : "row",
    backgroundColor : Colors.notBg,
    borderColor     : Colors.notBg,
    borderWidth     : 1,
    marginTop       : 12,
    marginHorizontal: 24,
    borderRadius    : 16,
    flex            : 1,
    alignItems      : "flex-start"
  },
  iconContainer: {
    padding        : 8,
    backgroundColor: Colors.primary,
    borderRadius   : 8,
  },
  contentContainer: {
    marginHorizontal: 14,
    },
    title: {
      fontSize  : 14,
      color     : Colors.text2,
      lineHeight: 18,
      fontFamily: "MonMedium",
    }
});