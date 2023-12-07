import { Linking, Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useState } from "react";
export const useNotification = () => {
  const [token, setToken] = useState("");
  const registerForPushNotificationsAsync = async () => {
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        // Alert.alert("Мэдэгдэл хүлээн авах эрхийг нээнэ үү");
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      setToken(token);
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name            : "default",
        importance      : Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor      : "#FF231F7C",
      });
    }
  };
  const handleNotificationResponse = (response: Notifications.NotificationResponse) => {
    const data: { url?: string } = response.notification.request.content.data;
    if (data?.url) Linking.openURL(data.url);
  };

  return { registerForPushNotificationsAsync, handleNotificationResponse,  token };
};
