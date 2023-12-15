import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationRoutes, RootStackParamList } from "./types";
import { useSWRToken } from "../hooks/use-swr-token";
import { authMe } from "../store/auth-slice";
import { UserApi } from "../api";
import { IAuth } from "../interfaces/auth";
import { LoginScreen } from "../screens/auth/login";
import { SignUpScreen } from "../screens/auth/sign-up";
import { HomeScreen } from "../screens/home/home";
import { OnBoardScreen } from "../screens/auth/on-board";
import { NavigationContainer } from "@react-navigation/native";
import { PrivacyScreen } from "../screens/privacy";
import { BuyEggScreen } from "../screens/home/buy-egg";
import { PinCodeScreen } from "../screens/auth/pin-code";
import { PinCodeRegisterScreen } from "../screens/auth/pin-code-register";

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const dispatch = useDispatch();

  const { user } = useSelector((state: { auth: IAuth }) => state.auth);

  console.log(user, "user");

  const { isInitialLoading,  } = useSWRToken(
    "swr.user.me",
    async () => {
      return await UserApi.me();
    },
    {
      onSuccess: authData => {
        dispatch(authMe(authData));
      },
    },
  );


  const checkUser = () => {
    if(user?.type ==="CHECK_PHONE_LOGIN"){
       return(
         <Stack.Screen component={PinCodeScreen} name={NavigationRoutes.PinCodeScreen} />
       );
    }
   if(user?.type ==="CHECK_PHONE_REGISTER"){
    return(
      <Stack.Screen component={PinCodeRegisterScreen} name={NavigationRoutes.PinCodeRegisterScreen} />
    );
   }
  };

  if (isInitialLoading) {
    return null;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {user ? (
          <>
            {checkUser()}
            <Stack.Screen component={HomeScreen} name={NavigationRoutes.HomeScreen} />
            <Stack.Screen component={PrivacyScreen} name={NavigationRoutes.PrivacyScreen} />
            <Stack.Screen component={BuyEggScreen} name={NavigationRoutes.BuyEggScreen} />
          </>
        ) : (
          <Stack.Group>
            <Stack.Screen component={OnBoardScreen} name={NavigationRoutes.OnBoardScreen} />
            <Stack.Screen component={LoginScreen} name={NavigationRoutes.LoginScreen} />
            <Stack.Screen component={SignUpScreen} name={NavigationRoutes.SignUpScreen} />
          </Stack.Group>
        )}


      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
