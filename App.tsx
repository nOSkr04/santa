import React from "react";
import { StyleSheet, } from "react-native";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { SWRConfig } from "swr";
import useCachedResources from "./src/hooks/use-cached-resources";
import { persistor, store } from "./src/store";
import { SwrProviderConfig } from "./src/providers/swr-config";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootNavigator from "./src/navigation/root-navigator";
import { useEffect } from "react";
import { useNotification } from "./src/hooks/use-notification";
import * as Notifications from "expo-notifications";
import { useUpdates } from "./src/hooks/use-update";


export default function App() {
  const isLoadingComplete = useCachedResources();
  const { registerForPushNotificationsAsync, handleNotificationResponse } = useNotification();
  const { onFetchUpdateAsync } = useUpdates();

  useEffect(() => {
    registerForPushNotificationsAsync();
    onFetchUpdateAsync();
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldPlaySound: true,
        shouldShowAlert: true,
        shouldSetBadge : true,
      }),
    });
    
    const responseListener = Notifications.addNotificationResponseReceivedListener(handleNotificationResponse);
    return () => {
      if (responseListener) Notifications.removeNotificationSubscription(responseListener);
    };
  }, [handleNotificationResponse, onFetchUpdateAsync, registerForPushNotificationsAsync]);

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SWRConfig
          value={SwrProviderConfig}
        >
          <GestureHandlerRootView style={styles.container}>
            <SafeAreaProvider>
              <RootNavigator />
            
            </SafeAreaProvider>
          </GestureHandlerRootView>
        </SWRConfig>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
