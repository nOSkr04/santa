import {  Dimensions, KeyboardAvoidingView, Platform, ScrollView, StyleSheet,  View } from "react-native";
import React, { memo,   useRef, useState } from "react";
import { BackAppBar } from "../../components/header/back-app-bar";
import { Colors } from "../../constants/colors";
import { Image } from "expo-image";
import LottieView from "lottie-react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigationRoutes, RootStackParamList } from "../../navigation/types";
import { UserApi } from "../../api";
import useSWR, { useSWRConfig } from "swr";
import { IUser } from "../../interfaces/user";
import { Loading } from "../../components/common/loading";
import { GiftSuccessModal } from "../../components/modal/gift-success.modal";
import { useToast } from "react-native-toast-notifications";
import { User } from "../../models/user";
import {  useForm } from "react-hook-form";
import { EggForm, UserEggForm } from "../../components/form/egg-form";
const width = Dimensions.get("window").width;

type Props = NativeStackScreenProps<RootStackParamList, NavigationRoutes.GiftEggUserScreen>;



const GiftEggUserScreen = memo(({ route }: Props) => {
  const { handleSubmit, control, formState: { errors },  watch, setValue } = useForm<UserEggForm>({
    defaultValues: {
      egg    : 1,
      message: ""
    }
  });
  const { detail } = route.params;
  const toast = useToast();
  const { mutate } = useSWRConfig();
  const animate = useRef(null);
  const [loading, setLoading] = useState(false);
  const [modal,setModal] = useState(false);
  const { data: user }=  useSWR<IUser>("swr.user.me");
  const [confirm, setConfirm] = useState({
    eggCount: 0,
    phone   : "string"
  });

  const onPress = async (data: UserEggForm) => {
    setLoading(true);
    try {
      await UserApi.giftUserEgg({ phone: detail.phone, egg: data.egg, message: data.message });
      const _user = User.fromJson(user!);
      _user.setEggMinus(mutate, data.egg);
      setConfirm({
        eggCount: data.egg,
        phone   : detail.phone
      });
      setModal(true);
    } catch (err:any) {
      toast.show("Алдаа", {
        type: "error",
        data: {
          title: err.error.message || "Алдаа",
        },
        duration : 2000,
        placement: "top",
      });
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BackAppBar sharedTag={"giftEggBuy"} title="Өндөг илгээх" />
      <View style={styles.divider} />

      {loading ?
        <View style={styles.loading}>
          <Loading title />
        </View>
        :
        <>
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
              <EggForm control={control} detail={detail} errors={errors} onSubmit={handleSubmit(onPress)} setValue={setValue} user={user!} watch={watch} />
            </ScrollView>
          </KeyboardAvoidingView>
          <GiftSuccessModal confirm={confirm} modal={modal} setModal={setModal}  />
        </>
      }
    </>
  );
});

GiftEggUserScreen.displayName = "GiftEggUserScreen";

export { GiftEggUserScreen };

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
  
  loading: {
    backgroundColor: Colors.primary,
    alignItems     : "center",
    justifyContent : "center",
    flex           : 1
  }
});
