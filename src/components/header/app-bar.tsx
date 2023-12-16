import { StyleSheet,  TouchableOpacity, View } from "react-native";
import React, { useCallback } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Colors } from "../../constants/colors";
const AppBar = ({ openDrawer }: { openDrawer: any }) => {

    const sf = useSafeAreaInsets();

    const top = useCallback(() => {
        return {
            marginTop: sf.top,
        };
    }, [sf.top]);

    const onPress = useCallback(() => {
        openDrawer();
    }, [openDrawer]);

    return (
      <>
        <View style={[top(), styles.container]}>
          <TouchableOpacity onPress={onPress}>
            <AntDesign color={Colors.white} name="menuunfold" size={24} />
          </TouchableOpacity>
          <Image contentFit='contain' source={require("../../assets/img/logo.png")} style={styles.logo} />
        </View>
        <View style={styles.divider}  />
      </>
    );
};

export default AppBar;

const styles = StyleSheet.create({
    container: {
        flexDirection    : "row",
        alignItems       : "center",
        justifyContent   : "space-between",
        paddingHorizontal: 26,
        backgroundColor  : Colors.primary,
        paddingVertical  : 4
    },
    logo: {
        width : 100,
        height: 50,
    },
    divider: {
        borderWidth: 1,
        borderColor: Colors.white,
    }
});