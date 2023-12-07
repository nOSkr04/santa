/* eslint-disable no-unused-vars */

import { NativeStackScreenProps } from "@react-navigation/native-stack";

export enum NavigationRoutes {
  LoginScreen= "LoginScreen",
  SignUpScreen= "SignUpScreen",
  OnBoardScreen= "OnBoardScreen",
  HomeScreen= "HomeScreen",

}

export type RootStackParamList = {
  LoginScreen: undefined
  SignUpScreen: undefined
  HomeScreen: undefined
  OnBoardScreen: undefined
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
