import { StyleSheet,  Text,  TouchableOpacity, View } from "react-native";
import React, { useCallback } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Colors } from "../../constants/colors";
import useSWR from "swr";
const AppBar = ({ openDrawer }: { openDrawer: () => void }) => {

  const { data } = useSWR("swr.user.me");

    const sf = useSafeAreaInsets();

    const top = useCallback(() => {
        return {
            paddingTop: sf.top,
        };
    }, [sf.top]);

    const onPress = useCallback(() => {
        openDrawer();
    }, [openDrawer]);

    return (
      <>
        <View style={[top(), styles.container]}>
          <TouchableOpacity onPress={onPress} style={styles.button}>
            <AntDesign color={Colors.white} name="menuunfold" size={24} />
            {data?.notificationCount >= 0 &&
              <View style={styles.badgeContainer}>
                <Text style={styles.badge}>{data?.notificationCount > 9 ? "9+"  : data?.notificationCount}</Text>
              </View>
          }
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
        flexDirection  : "row",
        alignItems     : "center",
        justifyContent : "space-between",
        paddingRight   : 26,
        backgroundColor: Colors.primary,
        paddingVertical: 4,
        zIndex         : 999
    },
    logo: {
        width : 100,
        height: 50,
    },
    divider: {
        borderWidth: 1,
        borderColor: Colors.white,
    },
    button: {
      paddingHorizontal: 26,
      paddingVertical  : 8
    },
    badgeContainer: {
      backgroundColor: Colors.white,
      borderRadius   : 100,
      position       : "absolute",
      right          : 10,
      bottom         : -5,
      height         : 24,
      width          : 24,
      alignItems     : "center",
      justifyContent : "center"
    },
    badge: {
      fontSize  : 12,
      fontFamily: "MonSemiBold",
      color     : Colors.primary,
      
      
    },
});