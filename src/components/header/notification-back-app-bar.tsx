import { StyleSheet,  TouchableOpacity, View,  } from "react-native";
import React, { memo, useCallback,  } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { Colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { IUser } from "../../interfaces/user";
import useSWR, { useSWRConfig } from "swr";
import { User } from "../../models/user";

type Props ={
    title: string,
    sharedTag: string,
}

const NotificationBackAppBar = memo(({ title, sharedTag }: Props) => {
    const navigation = useNavigation();
    const sf = useSafeAreaInsets();
    const { mutate } = useSWRConfig();
    const { data } = useSWR<IUser>("swr.user.me");
    const animatedStyle = useAnimatedStyle(() =>({
        paddingTop: sf.top+ 10,
    }));

    const goBack = useCallback(() => {navigation.goBack();
      const _user = User.fromJson(data!);


      _user.setNotification(mutate);
    },[data, mutate, navigation]);
    return (
      <>
        <Animated.View style={[animatedStyle, styles.container]}>
          <TouchableOpacity onPress={goBack} style={styles.button}>
            <AntDesign color={Colors.white} name="left" size={24} />
          </TouchableOpacity>
          <Animated.Text sharedTransitionTag={sharedTag} style={styles.title}>{title}</Animated.Text>
          <TouchableOpacity >
            <AntDesign color={Colors.primary} name="left" size={24} />
          </TouchableOpacity>
        </Animated.View>
        <View style={styles.divider}   />
      </>
    );
  });

  NotificationBackAppBar.displayName="NotificationBackAppBar";

export { NotificationBackAppBar };

const styles = StyleSheet.create({
    container: {
        backgroundColor  : Colors.primary,
        flexDirection    : "row",
        alignItems       : "center",
        justifyContent   : "space-between",
        paddingHorizontal: 12,
        paddingVertical  : 16
    },
    divider: {
        borderWidth: 1,
        borderColor: Colors.white,
    },
    title: {
        fontSize  : 15,
        color     : Colors.white,
        fontFamily: "MonBold",
    },
    button: {
      padding: 8
    }

});