import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo, useCallback, } from "react";
import Modal from "react-native-modal";
import { Colors } from "../../constants/colors";
import useSWR from "swr";
import { IUser } from "../../interfaces/user";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { NavigationRoutes } from "../../navigation/types";
import { AntDesign } from "@expo/vector-icons";

type Props = {
  modal: boolean;
  detail: {
    phone: string,
    isUser: boolean
  };
  setModal: React.Dispatch<React.SetStateAction<boolean>>
}

const GiftChooseModal = memo(({ modal, detail, setModal }: Props) => {
  const { data } = useSWR<IUser>("swr.user.me");
  const navigation = useNavigation();

  const onSubmitBuy = useCallback(() => {
    setModal(false);
    navigation.navigate(NavigationRoutes.GiftEggBuyScreen, { detail });
  }, [navigation, setModal, detail]);

  const onSubmitGift = useCallback(() => {
    setModal(false);
    navigation.navigate(NavigationRoutes.GiftEggUserScreen, { detail });
  }, [navigation, setModal, detail]);

  const opacity = useCallback(() => {
    if(data?.eggCount === 0){

      return{
        opacity: 0.5
      };
    }
    return {
      opacity: 1
    };
  },[data?.eggCount]);

  const modalHide = useCallback(() => {
    setModal(false);
  },[setModal]);

  return (
    <View>
      <Modal animationIn={"pulse"}  isVisible={modal} onBackdropPress={modalHide} onModalHide={() => setModal(false)} onModalWillHide={() => setModal(false)}>
        <View style={styles.modal}>
          <TouchableOpacity onPress={() => setModal(false)} style={styles.backButton}>
            <AntDesign color={Colors.primary} name="close" size={24} />
          </TouchableOpacity>
          <Image source={require("../../assets/img/gift-hand.png")} style={styles.iconContainer} />
          <Text style={styles.modalTitle}>Бэлэг илгээх төрөл</Text>
          <Text style={styles.modalDescription}>Та өөрийн хайртай дотнын хүндээ өөрт байгаа өндөг эсвэл худалдаж аван илгээх боломжтой.</Text>
          <View style={styles.h15} />
          <View style={styles.h15} />
          <TouchableOpacity disabled={data?.eggCount === 0} onPress={onSubmitGift} style={[styles.giftButton, opacity()]}>
            <Text style={styles.giftTilte}>Өөрт байгаа өндөгнөөс илгээх </Text>
            <Text style={styles.giftTilte}>({data?.eggCount === 0 ? "Танд өндөг байхгүй байна" : `${data?.eggCount} өндөг`})</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onSubmitBuy} style={styles.giftButton}>
            <Text style={styles.giftTilte}>Худалдан авч илгээх</Text>
          </TouchableOpacity>
          <View style={styles.h15} />
          <View style={styles.h15} />
        </View>
      </Modal>
    </View>
  );
});

GiftChooseModal.displayName = "GiftChooseModal";

export { GiftChooseModal };

const styles = StyleSheet.create({
  modal: {
    backgroundColor  : Colors.white,
    borderRadius     : 8,
    paddingHorizontal: 20
  },
  iconContainer: {
    marginTop: 35,
    width    : 100,
    height   : 100,
    alignSelf: "center"
  },
  modalTitle: {
    marginTop : 12,
    fontSize  : 15,
    color     : Colors.primary,
    lineHeight: 22,
    fontFamily: "MonSemiBold",
    textAlign : "center"
  },
  modalDescription: {
    fontSize  : 15,
    lineHeight: 20,
    color     : Colors.text2,
    fontFamily: "MonMedium",
    textAlign : "center",
    marginTop : 8
  },
  giftButton: {
    marginHorizontal: 20,
    borderWidth     : 1,
    borderColor     : Colors.primary,
    backgroundColor : Colors.primary,
    marginTop       : 10,
    borderRadius    : 8,
    padding         : 12
  },
  giftTilte: {
    fontSize  : 15,
    lineHeight: 20,
    color     : Colors.white,
    fontFamily: "MonSemiBold",
    textAlign : "center"
  },
  h15: {
    height: 15
  },
  backButton: {
    padding : 10,
    position: "absolute",
    left    : 10,
    top     : 10
  }
});