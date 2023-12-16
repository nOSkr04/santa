import { StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { INotification } from "../../interfaces/notification";

const NotificationCard = memo(({ item }: {item:INotification}) => {
    return (
      <View>
        <Text>{item.title}</Text>
      </View>
    );
  });

  NotificationCard.displayName="NotificationCard";

export { NotificationCard };

const styles = StyleSheet.create({});