import { Dimensions, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useCallback } from 'react'
import { ILoginForm, LoginForm } from '../../components/auth/login-form'
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { AuthApi } from '../../api';
import { authLogin } from '../../store/auth-slice';
import { Image } from 'expo-image';
import { Colors } from '../../constants/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NavigationRoutes } from '../../navigation/types';

const width = Dimensions.get("window").width;

const LoginScreen = memo(() => {
  const dispatch = useDispatch();
  const sf = useSafeAreaInsets();
  const navigation = useNavigation();
  const { handleSubmit, control, formState: { errors }, setError } = useForm<ILoginForm>();

  const onSubmit = useCallback(async (data: ILoginForm) => {
    try {
      // const res = await AuthApi.login(data);
      // dispatch(authLogin(res))
      navigation.navigate(NavigationRoutes.HomeScreen)
    } catch (err: any) {
      setError("password", {
        message: err.response.data.error.message
      })
    }
  }, [])





  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.root}>
      <Image source={require("../../assets/imgs/login-top.png")} style={[styles.topImage, {top: sf.top}]} />
      <View style={styles.content}>
        <Text style={styles.title}>Тавтай морил</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <LoginForm control={control} errors={errors} />
        </ScrollView>
        <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
          <Text style={styles.buttonTitle}>Нэвтрэх</Text>
        </TouchableOpacity>
      </View>
      <Image source={require("../../assets/imgs/login-bot.png")} style={[styles.bottomImage, {bottom: sf.bottom}]} />
    </KeyboardAvoidingView>
  )
})

LoginScreen.displayName = "LoginScreen"

export { LoginScreen }

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.secondary,
    justifyContent: "center",

  },
  images: {
    width,
    height: 200
  },
  content: {
    backgroundColor: Colors.white40,
    marginHorizontal: 28,
    borderRadius: 31,
    zIndex: 3
  },
  title: {
    marginLeft: 26,
    marginTop: 75,
    fontFamily: "MonBold",
    fontSize: 24,
    marginBottom: 26
  },
  button: {
    marginTop: 46,
    marginBottom: 75,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    marginHorizontal: 26,
    borderRadius: 10
  },
  buttonTitle: {
    fontFamily: "MonBold",
    fontSize: 15,
    color: Colors.white,
    paddingVertical: 13
  },
  topImage:{
    left:0,
    width:160,
    height:240,
    position:"absolute",
  },
  bottomImage:{
    right:0,
    width:200,
    height:250,
    position:"absolute",
    zIndex:2
  }
})