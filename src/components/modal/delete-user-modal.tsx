import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo, useCallback, useState, } from "react";
import Modal from "react-native-modal";
import { Colors } from "../../constants/colors";
import { Image } from "expo-image";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { AuthApi } from "../../api";
import { authLogout } from "../../store/auth-slice";
import { useToast } from "react-native-toast-notifications";
import { Loader } from "../common/loader";

type Props = {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>
}

const DeleteUserModal = memo(({ modal, setModal }: Props) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const onDelete = useCallback(async () => {
    setLoading(true);
    try {
      await AuthApi.deleteUser();
      dispatch(authLogout());
    } catch (err: any) {
      toast.show("Алдаа гарлаа", {
        type: "error",
        data: {
          title: err?.error?.message || "Алдаа гарлаа",
        },
        duration : 2000,
        placement: "top",
      });
    } finally {
      setModal(false);
      setLoading(false);
    }

  }, [dispatch, setModal, toast]);

  return (
    <View>
      <Modal isVisible={modal}>
        <View style={styles.modal}>
          {loading ? <Loader /> :
          <>
            <TouchableOpacity onPress={() => setModal(false)} style={styles.backButton}>
              <AntDesign color={Colors.primary} name="close" size={24} />
            </TouchableOpacity>
            <Image placeholder={"LC8$K]adRwo$n$fRbcjZRdj]omad"} source={"https://evseg.s3.ap-southeast-1.amazonaws.com/65e0bb66-9f52-498f-9cdb-3f96a8e6e602.jpg"} style={styles.iconContainer} />
            <Text style={styles.modalTitle}>Бүртгэл устгах</Text>
            <Text style={styles.modalDescription}>Та өөрийн бүртгэлийг устгавал дахиж сэргээгдэхгүй болохыг анхаарна уу!</Text>
            <View style={styles.h30} />
            <View style={styles.rowButton}>
              <TouchableOpacity onPress={() => setModal(false)} style={styles.secondaryButton}>
                <Text>Болих</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onDelete} style={styles.primaryButton}>
                <Text>Устгах</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.h30} />
          </>
          }
        </View>
      </Modal>
    </View>
  );
});

DeleteUserModal.displayName = "DeleteUserModal";

export { DeleteUserModal };

const styles = StyleSheet.create({
  modal: {
    backgroundColor  : Colors.white,
    borderRadius     : 8,
    paddingHorizontal: 20
  },
  iconContainer: {
    marginTop: 35,
    width    : 40,
    height   : 40,
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
  h30: {
    height: 30
  },
  backButton: {
    padding : 10,
    position: "absolute",
    left    : 10,
    top     : 10
  },
  rowButton: {
    flexDirection : "row",
    alignItems    : "center",
    justifyContent: "space-between"
  },
  secondaryButton: {
    backgroundColor: Colors.button,
    paddingVertical: 12,
    alignItems     : "center",
    justifyContent : "center",
    borderRadius   : 8
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    alignItems     : "center",
    justifyContent : "center",
    borderRadius   : 8
  },
  primaryTitle: {
    fontSize  : 15,
    fontFamily: "MonMedium",
    color     : Colors.white,
  },
  secondaryTitle: {
    fontSize  : 15,
    fontFamily: "MonMedium",
    color     : Colors.white,
  },
});