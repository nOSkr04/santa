import { Dimensions, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo,  } from "react";
import { ILoginForm, LoginForm } from "../../components/auth/login-form";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { AuthApi } from "../../api";
import { authLogin } from "../../store/auth-slice";
import { Image } from "expo-image";
import { Colors } from "../../constants/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";
import { NavigationRoutes } from "../../navigation/types";
const width = Dimensions.get("window").width;

const LoginScreen = memo(() => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const sf = useSafeAreaInsets();
  const { handleSubmit, control, formState: { errors }, setError } = useForm<ILoginForm>();

  const onSubmit = async (data: ILoginForm) => {
    const token = (await Notifications.getExpoPushTokenAsync()).data;

    const createData = {
      ...data,
      expoPushToken: token,
    };
    try {
      const res = await AuthApi.login(createData);
      dispatch(authLogin(res));
    } catch (err: any) {
      console.log(err);
      if(err.statusCode === 404){
        setError("root", {
          message: "Серверт алдаа гарсан байна та түр хүлээнэ үү"
        });
        return;
      }
      setError("root", {
        message: err.error.message
      });
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.root}>
      <Image source={require("../../assets/imgs/login-top.png")} style={[styles.topImage, { top: sf.top }]} />
      <View style={styles.content}>
        <Text style={styles.title}>Тавтай морил2</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <LoginForm control={control} errors={errors} />
          {errors.root &&
            <Text style={styles.errorText}>{errors.root.message}</Text>
        }
        </ScrollView>
        <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
          <Text style={styles.buttonTitle}>Нэвтрэх</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate(NavigationRoutes.SignUpScreen)} style={styles.button}>
          <Text style={styles.buttonTitle}>Бүртгүүлэх</Text>
        </TouchableOpacity>
      </View>
      <Image source={require("../../assets/imgs/login-bot.png")} style={[styles.bottomImage, { bottom: sf.bottom }]} />
    </KeyboardAvoidingView>
  );
});

LoginScreen.displayName = "LoginScreen";

export { LoginScreen };

const styles = StyleSheet.create({
  root: {
    flex           : 1,
    backgroundColor: Colors.secondary,
    justifyContent : "center",

  },
  images: {
    width,
    height: 200
  },
  content: {
    backgroundColor : Colors.white40,
    marginHorizontal: 28,
    borderRadius    : 31,
    zIndex          : 3
  },
  title: {
    marginLeft  : 26,
    marginTop   : 75,
    fontFamily  : "MonBold",
    fontSize    : 24,
    marginBottom: 26
  },
  button: {
    marginTop       : 46,
    marginBottom    : 75,
    alignItems      : "center",
    justifyContent  : "center",
    backgroundColor : Colors.primary,
    marginHorizontal: 26,
    borderRadius    : 10
  },
  buttonTitle: {
    fontFamily     : "MonBold",
    fontSize       : 15,
    color          : Colors.white,
    paddingVertical: 13
  },
  topImage: {
    left    : 0,
    width   : 160,
    height  : 240,
    position: "absolute",
  },
  bottomImage: {
    right   : 0,
    width   : 200,
    height  : 250,
    position: "absolute",
    zIndex  : 2
  },
  errorText: {
    color      : Colors.danger,
    textAlign  : "right",
    marginRight: 26,
    fontSize   : 12,
  },
});