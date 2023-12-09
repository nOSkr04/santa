import { ActivityIndicator, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { memo, useCallback, useMemo, useRef, useState } from "react";
import { BackAppBar } from "../../components/header/back-app-bar";
import { Colors } from "../../constants/colors";
import { Image } from "expo-image";
import AntDesign from "@expo/vector-icons/AntDesign";
import { UserApi } from "../../api";
import useSWR from "swr";
import { IUser } from "../../interfaces/user";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { QpaySheet } from "../../components/sheet/qpay-sheet";
import { SheetBackdrop } from "../../components/sheet/back-drop";
import { useNavigation } from "@react-navigation/native";
import { NavigationRoutes, RootStackParamList } from "../../navigation/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
const width = Dimensions.get("window").width;

type Props = NativeStackScreenProps<RootStackParamList, NavigationRoutes.BuyEggScreen>;

const BuyEggScreen = memo(({ route }: Props) => {
  const { data } = useSWR<IUser>("swr.user.me");
  const navigation = useNavigation();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [egg, setEgg] = useState("1");
  const [snapIndex, setSnapIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState<null | string>(null);
  const snapPoints = useMemo(() => ["90%"], []);
  const intEgg = parseInt(egg, 10);
  const onPress = async () => {
    setLoading(true);
    const amout = intEgg * 100;
    try {
      const res = await UserApi.postInvoice(data!._id, amout);
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

  const goBack = useCallback(( ) => {
    navigation.goBack();
  },[navigation]);

  const minusEgg = useCallback(() => {
     const eggInt = parseInt(egg, 10);
     setEgg(`${eggInt - 1}`);
  },[egg]);
  const plusEgg = useCallback(() => {
     const eggInt = parseInt(egg, 10);
     setEgg(`${eggInt + 1}`);
  },[egg]);

  return (
    <>
      <BackAppBar sharedTag={route.params?.sideBar ? "addEgg2":"addEgg"} title="Өндөг авах" />
      <View style={styles.divider} />

      {loading ?
        <ActivityIndicator />
        :
        <View style={styles.container}>
          <Image contentFit="contain" source={require("../../assets/app/shop2.png")} style={styles.image2} />
          <Image contentFit="contain" source={require("../../assets/app/shoping.png")} style={styles.image} />
          <View style={styles.contentContainer}>
            <Text style={styles.eggTitle}>{egg}өндөг = {(intEgg * 20000).toLocaleString()} ₮</Text>
            <View style={styles.eggContainer}>
              <TouchableOpacity onPress={minusEgg} style={styles.sumButton}>
                <AntDesign color={Colors.white} name="minus" size={24} />
              </TouchableOpacity>
              <TextInput
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
              <TouchableOpacity onPress={() => setEgg("1")} style={styles.rowButton}>
                <Text style={styles.rowButtonTitle}>1ш өндөг</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setEgg("3")} style={styles.rowButton}>
                <Text style={styles.rowButtonTitle}>3ш өндөг</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setEgg("5")} style={styles.rowButton}>
                <Text style={styles.rowButtonTitle}>5ш өндөг</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={onPress} style={styles.submit}>
              <Text style={styles.rowButtonTitle}>Авах</Text>
            </TouchableOpacity>
          </View>
        </View>
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
          <QpaySheet closeBottomSheet={closeBottomSheet} egg={intEgg} goBack={goBack} payment={payment} />
        </BottomSheetModal>
      }
    </>
  );
});

BuyEggScreen.displayName = "BuyEggScreen";

export { BuyEggScreen };

const styles = StyleSheet.create({
  divider: {
    borderWidth: 1,
    borderColor: Colors.white,
  },
  container: {
    flex           : 1,
    backgroundColor: Colors.primary,
    justifyContent : "center",
    alignItems     : "center"
  },
  image: {
    width   : width / 1.4,
    height  : width / 1.4,
    bottom  : -20,
    position: "absolute",
    right   : -10
  },
  image2: {
    width   : width / 1.4,
    height  : width / 1.4,
    top     : 20,
    position: "absolute",
    right   : 30,
    left    : 30,
  },
  contentContainer: {
    backgroundColor: Colors.white40,
    width          : width - 40,
    borderRadius   : 8,
    paddingVertical: 40
  },
  eggTitle: {
    color         : Colors.white,
    fontFamily    : "MonBold",
    fontSize      : 20,
    textAlign     : "center",
    marginVertical: 20
  },
  eggContainer: {
    flexDirection : "row",
    alignItems    : "center",
    justifyContent: "space-around"
  },
  sumButton: {
    padding        : 8,
    backgroundColor: Colors.primary,
    borderRadius   : 8
  },
  input: {
    backgroundColor: Colors.primary,
    padding        : 8,
    borderRadius   : 8,
    width          : width / 2.2,
    color          : Colors.white
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
    backgroundColor: Colors.third
  },
  rowButtonTitle: {
    fontSize  : 14,
    fontFamily: "MonSemiBold",
    color     : Colors.white,
  },
  submit: {
    borderRadius     : 8,
    padding          : 8,
    backgroundColor  : Colors.primary,
    alignSelf        : "flex-end",
    marginRight      : 15,
    marginTop        : 50,
    paddingHorizontal: 30
  },

});
