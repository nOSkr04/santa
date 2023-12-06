import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import { AppState, AppStateStatus } from "react-native";

export const SwrProviderConfig = {
  provider: () => new Map(),
  initFocus(callback: () => void) {
    let appState = AppState.currentState;

    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (appState.match(/inactive|background/) && nextAppState === "active") {
        callback();
      }
      appState = nextAppState;
    };

    const subscription = AppState.addEventListener("change", handleAppStateChange);

    return () => {
      subscription.remove();
    };
  },
  initReconnect(callback: () => void) {
    let isConnected = true;

    const handleNetStateChange = (nextNetState: NetInfoState) => {
      if (!isConnected && nextNetState.isConnected) {
        callback();
      }

      isConnected = !!nextNetState.isConnected;
    };

    const unsubscribe = NetInfo.addEventListener(handleNetStateChange);

    return () => {
      unsubscribe();
    };
  },
};