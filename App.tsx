import React, { useState } from "react";
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
import NetInfo from "@react-native-community/netinfo";
import { NoNetwork } from "./src/components/home/no-network";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { ToastProvider } from "react-native-toast-notifications";
import { renderType } from "./src/components/toast/notification";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const [isConnected, setIsConnected] = useState<boolean | null>(false);
  const { registerForPushNotificationsAsync, handleNotificationResponse } = useNotification();
  const { onFetchUpdateAsync } = useUpdates();

  useEffect(() => {
    registerForPushNotificationsAsync();
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
  }, [handleNotificationResponse, registerForPushNotificationsAsync]);

  useEffect(() => {
    onFetchUpdateAsync();
  },[onFetchUpdateAsync]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (isConnected !== state.isConnected) {
        setIsConnected(state.isConnected);
      }
    });
    return () => {
      unsubscribe;
    };
  }, [isConnected]);

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
            <BottomSheetModalProvider>

              <SafeAreaProvider>
                <ToastProvider renderType={renderType} >
                  {!isConnected && <NoNetwork isConnected={isConnected} />}
                  <RootNavigator />
                </ToastProvider>
            
              </SafeAreaProvider>
            </BottomSheetModalProvider>
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
