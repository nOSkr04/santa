import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

export default function useCachedResources() {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts

        await Font.loadAsync({
          "MonBold"     : require("../assets/fonts/Montserrat-Bold.ttf"),
          "MonSemiBold" : require("../assets/fonts/Montserrat-SemiBold.ttf"),
          "MonMedium"   : require("../assets/fonts/Montserrat-Medium.ttf"),
          "MonThin"     : require("../assets/fonts/Montserrat-Regular.ttf"),
          "NunitoBoldIt": require("../assets/fonts/Nunito-BoldItalic.ttf"),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setIsLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
