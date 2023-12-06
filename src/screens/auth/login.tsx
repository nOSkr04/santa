import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useCallback } from 'react'
import { ILoginForm, LoginForm } from '../../components/auth/login-form'
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { AuthApi } from '../../api';
import { authLogin } from '../../store/auth-slice';

const LoginScreen = memo(() => {
  const dispatch = useDispatch();
  const { handleSubmit, control, formState: { errors }, setError } = useForm<ILoginForm>();

  const onSubmit = useCallback(async (data: ILoginForm) => {
    try{
      const res = await AuthApi.login(data);
      dispatch(authLogin(res))
    } catch(err: any){
      setError("password", {
        message: err.response.data.error.message
      })
    }
  },[])

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.root}>
      <ScrollView style={styles.container}>
        <LoginForm control={control} errors={errors}/>
      </ScrollView>
      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <Text>Нэвтрэх</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
})

LoginScreen.displayName = "LoginScreen"

export { LoginScreen }

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  container: {
    flex: 1,
  }
})