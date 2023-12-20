import { Dimensions, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, } from "react-native";
import React, { memo, useState } from "react";
import { authLogin } from "../../store/auth-slice";
import { AuthApi } from "../../api";
import * as Notifications from "expo-notifications";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { ILoginForm, LoginForm } from "../../components/auth/login-form";
import { Image } from "expo-image";

const { width, height } = Dimensions.get("window");

const LoginScreen = memo(() => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { handleSubmit, control, formState: { errors }, setError } = useForm<ILoginForm>();

  const onSubmit = async (data: ILoginForm) => {
    setLoading(true);
    const token = (await Notifications.getExpoPushTokenAsync()).data;

    const createData = {
      phone        : data.phone,
      expoPushToken: token,
    };

    try {
      const res = await AuthApi.checkLoginPhone(createData);
      dispatch(authLogin(res));
    } catch (err: any) {
      if (err.statusCode === 404) {
        setError("root", {
          message: "Серверт алдаа гарсан байна та түр хүлээнэ үү"
        });
        return;
      }
      setError("phone", {
        message: err.error.message
      });
    } finally {
      setLoading(false);
    }
  };
  console.log(loading);
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.root}>
      <Image contentFit="cover" placeholder={"L93KNit:L#MIXUbIjEj[L}Vqt.tl"} source={"https://evseg.s3.ap-southeast-1.amazonaws.com/97c18868-7e22-40ba-97f7-7340afedf26e.jpg"} style={styles.bgImage} />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Image contentFit="cover" source={require("../../assets/img/login-bg.png")} style={styles.snowman} />
        <LoginForm control={control} errors={errors} loading={loading} onSubmit={handleSubmit(onSubmit)} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
});

LoginScreen.displayName = "LoginScreen";

export { LoginScreen };

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  bgImage: {
    pointerEvents: "none",
    width,
    height       : height + 150,
    position     : "absolute",
    top          : 0,
    left         : 0,
    right        : 0,
    bottom       : 0
  },
  container: {
    flex          : 1,
    alignItems    : "center",
    justifyContent: "center"
  },
  snowman: {
    width : width - 100,
    height: width - 100,
    zIndex: 9,
    top   : 15
  },
});