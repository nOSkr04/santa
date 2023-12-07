import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useCallback } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from "expo-image"
import { Colors } from '../../constants/colors';
const AppBar = ({ openDrawer }: { openDrawer: any }) => {

    const sf = useSafeAreaInsets();

    const top = useCallback(() => {
        return {
            marginTop: sf.top,
        }
    }, [])

    const onPress = useCallback(() => {
        openDrawer()
    }, [])

    return (
        <>
        <View style={[top(), styles.container]}>
            <TouchableOpacity onPress={onPress}>
                <AntDesign name="menuunfold" size={24} color={Colors.white} />
            </TouchableOpacity>
            <Image style={styles.logo} source={require("../../assets/imgs/logo.png")} contentFit='contain' />
        </View>
        <View style={styles.divider}  />
        </>
    )
}

export default AppBar

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal:26,
        backgroundColor:Colors.primary,
        paddingVertical:4
    },
    logo: {
        width: 100,
        height: 50,
    },
    divider:{
        borderWidth:1,
        borderColor:Colors.white,
    }
})