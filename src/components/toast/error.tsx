import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { memo, useCallback, useRef } from "react";
import LottieView from "lottie-react-native";
import { ToastProps } from "react-native-toast-notifications/lib/typescript/toast";
import { Colors } from "../../constants/colors";
const width = Dimensions.get("window").width;
const ErrorToast = memo(({ toast }: {toast:ToastProps}) => {
  const animation = useRef(null);

  const background = useCallback(() => {
    return{
      backgroundColor: toast.data?.background || Colors.danger,
    };
  },[toast.data?.background]);
  
  const text = useCallback(() => {
    return{
      color: toast.data?.textColor || Colors.white,
    };
  },[toast.data?.textColor]);

  return (
    <View style={[styles.root,background()]}>
      <LottieView
        autoPlay
        ref={animation}
        source={require("../../assets/lottie/error.json")}
        style={styles.lottie}
      />
      <Text style={[styles.errorTitle,text()]}>{toast.data?.title}</Text>
    </View>
  );
});

ErrorToast.displayName = "ErrorToast";

export { ErrorToast };

const styles = StyleSheet.create({
  lottie: {
    width : 48,
    height: 48
  },
  root: {
    flexDirection   : "row",
    alignItems      : "center",
    borderRadius    : 8,
    marginHorizontal: 18,
    width           : width - 36,
    flex            : 1
  },
  errorTitle: {
    fontSize  : 18,
    fontFamily: "MonBold",
    flex      : 1
  }
});