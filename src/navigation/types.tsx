/* eslint-disable no-unused-vars */

import { NativeStackScreenProps } from "@react-navigation/native-stack";

export enum NavigationRoutes {
  LoginScreen= "LoginScreen",
  SignUpScreen= "SignUpScreen",
  OnBoardScreen= "OnBoardScreen",
  HomeScreen= "HomeScreen",
  PrivacyScreen= "PrivacyScreen",
  BuyEggScreen= "BuyEggScreen",
  GiftEggScreen= "GiftEggScreen",
  GiftEggBuyScreen= "GiftEggBuyScreen",
  PinCodeScreen= "PinCodeScreen",
  PinCodeRegisterScreen= "PinCodeRegisterScreen",
  PinCodeVerifyScreen= "PinCodeVerifyScreen",
  NotificationScreen= "NotificationScreen",
  CheckVersionScreen= "CheckVersionScreen",
  GiftEggUserScreen= "GiftEggUserScreen",

}

export type RootStackParamList = {
  LoginScreen: undefined
  SignUpScreen: undefined
  PinCodeScreen:undefined
  PinCodeRegisterScreen:{password: string}
  PinCodeVerifyScreen: undefined
  HomeScreen: undefined
  OnBoardScreen: undefined
  PrivacyScreen: undefined
  BuyEggScreen: {sideBar?: boolean}
  NotificationScreen: undefined
  GiftEggScreen: undefined
  GiftEggBuyScreen: {user: {
    phone: string,
    isUser: boolean
  }}
  GiftEggUserScreen: {user: {
    phone: string,
    isUser: boolean
  }}
  CheckVersionScreen: undefined
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
