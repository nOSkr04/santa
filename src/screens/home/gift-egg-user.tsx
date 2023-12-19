import { ActivityIndicator, Dimensions, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { memo, useCallback,  useRef, useState } from "react";
import { BackAppBar } from "../../components/header/back-app-bar";
import { Colors } from "../../constants/colors";
import { Image } from "expo-image";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigationRoutes, RootStackParamList } from "../../navigation/types";
import { UserApi } from "../../api";
const width = Dimensions.get("window").width;

type Props = NativeStackScreenProps<RootStackParamList, NavigationRoutes.GiftEggUserScreen>;

const GiftEggUserScreen = memo(({ route }: Props) => {
  const { user } = route.params;
  const animate = useRef(null);
  const navigation = useNavigation();
  const [egg, setEgg] = useState("1");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const intEgg = parseInt(egg, 10);

  const onPress = async () => {
    setLoading(true);
    try {
      await UserApi.giftUserEgg({ phone: user.phone, egg: intEgg, message: "" });
      goBack();
    } catch (err) {
      console.log(err, "aaaa");
    }
    finally {
      setLoading(false);
    }
  };

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const minusEgg = useCallback(() => {
    const eggInt = parseInt(egg, 10);
    if(eggInt <= 1){
      return;
    }
    setEgg(`${eggInt - 1}`);
  }, [egg]);
  const plusEgg = useCallback(() => {
    const eggInt = parseInt(egg, 10);
    setEgg(`${eggInt + 1}`);
  }, [egg]);

  const setPlusButton = useCallback((plusEggs: string) => {
    
    const eggInt = parseInt(egg, 10);
    const plusEgg = parseInt(plusEggs, 10);
    if(!egg || egg === "NaN"){
      setEgg(`${plusEggs}`);
      return; 
    }
    const sumEgg = eggInt + plusEgg;
    setEgg(`${sumEgg}`);
  },[egg]);

  return (
    <>
      <BackAppBar sharedTag={"giftEggBuy"} title="Өндөг илгээх" />
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
              <Text style={styles.description}>{user.phone} - дугаартай хэрэглэгчэд өндөг бэлэглэх</Text>
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
              <Text style={styles.messageLabel}>Хэлэх үг</Text>
              <TextInput
                  cursorColor={Colors.white}
                  onChangeText={setMessage}
                  placeholder="Хэлэх үг"
                  placeholderTextColor={Colors.white40}
                  style={styles.messageInput}
                  value={message}
                />
              <View style={styles.buttonRow}>
                <TouchableOpacity onPress={() => setPlusButton("7")} style={styles.rowButton}>
                  <Text style={styles.rowButtonTitle}>7 ширхэг</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setPlusButton("27")} style={styles.rowButton}>
                  <Text style={styles.rowButtonTitle}>27 ширхэг</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setPlusButton("247")} style={styles.rowButton}>
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
  },
  description: {
    fontFamily: "MonMedium",
    fontSize  : 12,
    color     : Colors.text2,
    textAlign : "center"
  },
  messageInput: {
    backgroundColor: Colors.primary,
    padding        : 12,
    borderRadius   : 8,
    width          : width - 56 ,
    color          : Colors.white,
    textAlign      : "center",
    alignSelf      : "center"
  },
  messageLabel: {
    fontFamily  : "MonMedium",
    fontSize    : 12,
    color       : Colors.text2,
    marginLeft  : 24,
    marginTop   : 16,
    marginBottom: 8,

  }

});
