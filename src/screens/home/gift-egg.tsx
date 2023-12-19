import { Dimensions, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { memo, useRef, useState, } from "react";
import { Image } from "expo-image";
import LottieView from "lottie-react-native";
import { Controller, useForm } from "react-hook-form";

import { BackAppBar } from "../../components/header/back-app-bar";
import { Colors } from "../../constants/colors";
import { GiftChooseModal } from "../../components/modal/gift-choose-modal";
import { UserApi } from "../../api";

const width = Dimensions.get("window").width;

type GiftPhone = {
  phone: string
}

const GiftEggScreen = memo(() => {
  const animate = useRef(null);
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState({
    phone : "",
    isUser: false,
  });

  const { handleSubmit, control, formState: { errors } } = useForm<GiftPhone>();

  const onSubmit = async (data: GiftPhone) => {
    
    const phone = data.phone;
    try{
      const user = await UserApi.findUser(phone);
      setUser({
        phone : phone,
        isUser: user.status
      });
      console.log(user);

      setModal(true);
    } catch(err){
      console.log(err);
    }
  };

 

  return (
    <>
      <BackAppBar sharedTag={"giftEgg"} title="Өндөг бэлэглэх" />
      <View style={styles.divider} />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.root}>
        <ScrollView contentContainerStyle={styles.container}>
          <LottieView
            autoPlay
            ref={animate}
            source={require("../../assets/lottie/snow-animate.json")}
            style={styles.root}
          />
          <View style={styles.shadowImage}>
            <Image contentFit="contain" source={require("../../assets/img/gift.png")} style={styles.image} />
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.label}>Бэлэг авах дугаар</Text>
            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  keyboardType='number-pad'
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  placeholder="Утасны дугаар"
                  style={styles.input}
                  value={value}
                />
              )}
              rules={{ required: "Заавал бөглөнө" }}
            />
            {errors.phone && <Text style={styles.errorText}>{errors.phone?.message}</Text>}

            <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.submit}>
              <Text style={styles.primaryButton}>Үргэлжлүүлэх</Text>
            </TouchableOpacity>
            <View style={styles.h32} />

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <GiftChooseModal modal={modal}  setModal={setModal}  user={user} />
    </>
  );
});

GiftEggScreen.displayName = "GiftEggScreen";

export { GiftEggScreen };

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  divider: {
    borderWidth: 1,
    borderColor: Colors.white,
  },
  container: {
    flex           : 1,
    backgroundColor: Colors.primary,
    justifyContent : "flex-end",
    alignItems     : "center"
  },
  image: {
    width : width * 0.85,
    height: width * 0.85,
  },
  contentContainer: {
    backgroundColor: Colors.white,
    width,
    paddingVertical: 40,
  },
 
  input: {
    backgroundColor  : Colors.white,
    borderRadius     : 10,
    marginHorizontal : 24,
    marginTop        : 10,
    paddingVertical  : 14,
    paddingHorizontal: 8,
    shadowColor      : Colors.black,
    shadowOffset     : {
      width : 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius : 16.00,

    elevation: 24,
  },
  submit: {
    borderRadius     : 8,
    padding          : 12,
    backgroundColor  : Colors.primary,
    alignSelf        : "flex-end",
    marginRight      : 15,
    marginTop        : 50,
    paddingHorizontal: 40,
    right            : 10
  },
  h32: {
    height: 32
  },
  shadowImage: {
    shadowColor : Colors.white,
    shadowOffset: {
      width : 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius : 16.00,

    elevation: 24,
  },
  primaryButton: {
    fontSize  : 14,
    fontFamily: "MonSemiBold",
    color     : Colors.white,
  },

  label: {
    fontFamily: "MonMedium",
    fontSize  : 14,
    color     : Colors.black,
    marginLeft: 24
  },
  errorText: {
    color     : Colors.danger2,
    fontSize  : 14,
    fontFamily: "MonMedium",
    marginTop : 8,
    marginLeft: 24
  },
});
