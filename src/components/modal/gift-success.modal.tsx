import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo, useCallback, } from "react";
import Modal from "react-native-modal";
import { Colors } from "../../constants/colors";
import { Image } from "expo-image";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NavigationRoutes } from "../../navigation/types";

type Props = {
  modal: boolean;
  confirm: {
    phone: string,
    eggCount: number
  };
  setModal: React.Dispatch<React.SetStateAction<boolean>>
}

const GiftSuccessModal = memo(({ modal, confirm, setModal }: Props) => {

  const navigaiton = useNavigation();
  const modalHide = useCallback(() => {
    setModal(false);
  },[setModal]);

  const onPress = useCallback(() => {
    modalHide();
    navigaiton.navigate(NavigationRoutes.GiftEggScreen);
  },[modalHide, navigaiton]);

  return (
    <View>
      <Modal animationIn={"pulse"}  isVisible={modal} onBackdropPress={modalHide} onModalHide={() => setModal(false)} onModalWillHide={() => setModal(false)}>
        <View style={styles.modal}>
          <TouchableOpacity onPress={() => setModal(false)} style={styles.backButton}>
            <AntDesign color={Colors.primary} name="close" size={24} />
          </TouchableOpacity>
          <Image contentFit="contain" source={require("../../assets/img/congratz.png")} style={styles.iconContainer} />
          <Text style={styles.modalTitle}>Бэлэг амжилттай илгээгдсэн</Text>
          <Text style={styles.modalDescription}>{confirm.phone} дугаартай хэрэглэгчид {confirm.eggCount} өндөг илгээгдлээ </Text>
          <View style={styles.h15} />
          <View style={styles.h15} />
          <TouchableOpacity onPress={onPress} style={styles.giftButton}>
            <Text style={styles.giftTilte}>Нүүр хуудас буцах</Text>
          </TouchableOpacity>
          <View style={styles.h15} />
          <View style={styles.h15} />
        </View>
      </Modal>
    </View>
  );
});

GiftSuccessModal.displayName = "GiftSuccessModal";

export { GiftSuccessModal };

const styles = StyleSheet.create({
  modal: {
    backgroundColor  : Colors.white,
    borderRadius     : 8,
    paddingHorizontal: 20
  },
  iconContainer: {
    marginTop: 35,
    width    : 100,
    height   : 150,
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