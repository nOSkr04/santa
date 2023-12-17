import { ActivityIndicator, Dimensions, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { memo, useCallback, useMemo, useRef, useState } from "react";
import { BackAppBar } from "../../components/header/back-app-bar";
import { Colors } from "../../constants/colors";
import { Image } from "expo-image";
import AntDesign from "@expo/vector-icons/AntDesign";
import { UserApi } from "../../api";
import useSWR from "swr";
import { IUser } from "../../interfaces/user";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { SheetBackdrop } from "../../components/sheet/back-drop";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigationRoutes, RootStackParamList } from "../../navigation/types";
import { GiftQpaySheet } from "../../components/sheet/gift-qpay-sheet";
const width = Dimensions.get("window").width;

type Props = NativeStackScreenProps<RootStackParamList, NavigationRoutes.GiftEggBuyScreen>;

const GiftEggBuyScreen = memo(({ route }: Props) => {
  const { phone } = route.params;
  const animate = useRef(null);
  const { data } = useSWR<IUser>("swr.user.me");
  const navigation = useNavigation();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [snapIndex, setSnapIndex] = useState(-1);
  const [egg, setEgg] = useState("1");
  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState<null | string>(null);
  const snapPoints = useMemo(() => ["90%"], []);
  const intEgg = parseInt(egg, 10);

  const onPress = async () => {
    setLoading(true);
    const amout = intEgg * 100;
    try {
      const res = await UserApi.postGift(data!._id, amout, phone);
      setPayment(res.data);
      onQpaySheet();
    } catch (err) {
      console.log(err, "aaaa");
    }
    finally {
      setLoading(false);
    }
  };

  const onQpaySheet = useCallback(() => {
    bottomSheetModalRef.current?.present();
    setSnapIndex(0);
  }, []);
  const closeBottomSheet = useCallback(() => {
    bottomSheetModalRef.current?.close();
    setSnapIndex(-1);
    setPayment(null);
  }, []);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const minusEgg = useCallback(() => {
    const eggInt = parseInt(egg, 10);
    setEgg(`${eggInt - 1}`);
  }, [egg]);
  const plusEgg = useCallback(() => {
    const eggInt = parseInt(egg, 10);
    setEgg(`${eggInt + 1}`);
  }, [egg]);

  return (
    <>
      <BackAppBar sharedTag={"giftEggBuy"} title="Өндөг бэлэглэх" />
      <View style={styles.divider} />

      {loading ?
        <ActivityIndicator />
        :
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
              <Text style={styles.eggTitle}>{egg} өндөг = {(intEgg * 20000 || 0).toLocaleString()} ₮</Text>
              <View style={styles.eggContainer}>
                <TouchableOpacity onPress={minusEgg} style={styles.sumButton}>
                  <AntDesign color={Colors.white} name="minus" size={24} />
                </TouchableOpacity>

                <TextInput
                  cursorColor={Colors.white}
                  keyboardType="numeric"
                  onChangeText={setEgg}
                  placeholder="Өндөг"
                  placeholderTextColor={Colors.white40}
                  style={styles.input}
                  value={egg.toString()}
                />
                <TouchableOpacity onPress={plusEgg} style={styles.sumButton}>
                  <AntDesign color={Colors.white} name="plus" size={24} />
                </TouchableOpacity>

              </View>
              <View style={styles.buttonRow}>
                <TouchableOpacity onPress={() => setEgg("7")} style={styles.rowButton}>
                  <Text style={styles.rowButtonTitle}>7 ширхэг</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setEgg("27")} style={styles.rowButton}>
                  <Text style={styles.rowButtonTitle}>27 ширхэг</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setEgg("247")} style={styles.rowButton}>
                  <Text style={styles.rowButtonTitle}>247 ширхэг</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={onPress} style={styles.submit}>
                <Text style={styles.primaryButton}>Илгээх</Text>
              </TouchableOpacity>
              <View style={styles.h32} />

            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      }


      {payment &&
        <BottomSheetModal
          backdropComponent={SheetBackdrop}
          enableDismissOnClose={true}
          enablePanDownToClose
          index={snapIndex}
          onChange={onQpaySheet}
          onDismiss={closeBottomSheet}
          ref={bottomSheetModalRef}
          snapPoints={snapPoints}
        >
          <GiftQpaySheet closeBottomSheet={closeBottomSheet} egg={intEgg} goBack={goBack} payment={payment} phone={phone} />
        </BottomSheetModal>
      }
    </>
  );
});

GiftEggBuyScreen.displayName = "GiftEggBuyScreen";

export { GiftEggBuyScreen };

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
  eggTitle: {
    color         : Colors.black,
    fontFamily    : "MonBold",
    fontSize      : 20,
    textAlign     : "center",
    marginVertical: 20
  },
  eggContainer: {
    flexDirection   : "row",
    alignItems      : "center",
    justifyContent  : "space-between",
    marginHorizontal: 30
  },
  sumButton: {
    padding        : 8,
    backgroundColor: Colors.primary,
    borderRadius   : 8
  },
  input: {
    backgroundColor: Colors.primary,
    padding        : 12,
    borderRadius   : 8,
    width          : width / 2.2,
    color          : Colors.white,
    textAlign      : "center"
  },
  buttonRow: {
    flexDirection : "row",
    justifyContent: "space-around",
    alignItems    : "center",
    marginTop     : 28
  },
  rowButton: {
    borderRadius   : 8,
    padding        : 8,
    backgroundColor: Colors.white,
    borderWidth    : 1,
    borderColor    : Colors.black
  },
  rowButtonTitle: {
    fontSize  : 14,
    fontFamily: "MonSemiBold",
    color     : Colors.black,

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
  }

});
