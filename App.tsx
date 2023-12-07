import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from 'react-redux';
import { SWRConfig } from 'swr';
import useCachedResources from './src/hooks/use-cached-resources';
import { persistor, store } from './src/store';
import { SwrProviderConfig } from './src/providers/swr-config';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/root-navigator';
import { Snowflake } from './src/components/snows/snow-flake';

export default function App() {
  const isLoadingComplete = useCachedResources();

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
              <StatusBar backgroundColor="#122332" />
              {/* {new Array(100).fill(true).map((_, i) => (
                <Snowflake key={i} />
              ))} */}
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
