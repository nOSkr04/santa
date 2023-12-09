import { StyleSheet,  TouchableOpacity,  } from "react-native";
import React, { memo,  } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { Colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";

type Props ={
    title: string,
    sharedTag: string,
}

const BackAppBar = memo(({ title, sharedTag }: Props) => {
    const navigation = useNavigation();
    const sf = useSafeAreaInsets();

    const animatedStyle = useAnimatedStyle(() =>({
        paddingTop: sf.top+ 10,
       
       
    }));
    return (
      <Animated.View style={[animatedStyle, styles.container]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign color={Colors.white} name="left" size={24} />
        </TouchableOpacity>
        <Animated.Text sharedTransitionTag={sharedTag} style={styles.title}>{title}</Animated.Text>
        <TouchableOpacity >
          <AntDesign color={Colors.primary} name="left" size={24} />
        </TouchableOpacity>
      </Animated.View>
    );
  });

  BackAppBar.displayName="BackAppBar";

export { BackAppBar };

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
});