/* eslint-disable no-unused-vars */

import { NativeStackScreenProps } from "@react-navigation/native-stack";

export enum NavigationRoutes {
  LoginScreen= "LoginScreen",
  SignUpScreen= "SignUpScreen",
  OnBoardScreen= "OnBoardScreen",
  HomeScreen= "HomeScreen",
  PrivacyScreen= "PrivacyScreen",
  BuyEggScreen= "BuyEggScreen",
  PinCodeScreen= "PinCodeScreen",
  PinCodeRegisterScreen= "PinCodeRegisterScreen",

}

export type RootStackParamList = {
  LoginScreen: undefined
  SignUpScreen: undefined
  PinCodeScreen:undefined
  PinCodeRegisterScreen:undefined
  HomeScreen: undefined
  OnBoardScreen: undefined
  PrivacyScreen: undefined
  BuyEggScreen: {sideBar?: boolean}
};

// export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, Screen>;
export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}
