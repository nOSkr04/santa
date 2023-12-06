import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationRoutes, RootStackParamList } from "./types";
import { useSWRToken } from "../hooks/use-swr-token";
import { authMe } from "../store/auth-slice";
import { AuthApi } from "../api";
import { IAuth } from "../interfaces/auth";
import { LoginScreen } from "../screens/auth/login";
import { SignUpScreen } from "../screens/auth/sign-up";
import { HomeScreen } from "../screens/home/home";
import { OnBoardScreen } from "../screens/auth/on-board";

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const dispatch = useDispatch();

  const { user } = useSelector((state: { auth: IAuth }) => state.auth);

  const { isInitialLoading } = useSWRToken(
    "swr.user.me",
    async () => {
      return await AuthApi.me();
    },
    {
      onSuccess: authData => {
        dispatch(authMe(authData));
      },
    },
  );

  if (isInitialLoading) {
    return null;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {user ? (
        <>
          <Stack.Screen component={HomeScreen} name={NavigationRoutes.HomeScreen} />
        </>
      ) : (
        <>
        <Stack.Screen component={OnBoardScreen} name={NavigationRoutes.OnBoardScreen}  />
          <Stack.Screen component={LoginScreen} name={NavigationRoutes.LoginScreen} />
          <Stack.Screen component={SignUpScreen} name={NavigationRoutes.SignUpScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default RootNavigator;
