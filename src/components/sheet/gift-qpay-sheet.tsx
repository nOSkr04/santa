import React, { memo, useCallback, useEffect, } from "react";
import useSWR from "swr";
import { UserApi } from "../../api";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Banks } from "../home/banks";
import { IBank } from "../../interfaces/bank";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "../../constants/colors";
import { IUser } from "../../interfaces/user";
import { IWallet } from "../../interfaces/wallet";

type Props = {
    closeBottomSheet: () => void
    payment: string
    egg: number
    goBack: () => void
    phone: string
}

const GiftQpaySheet = memo(({ payment, egg, closeBottomSheet, goBack,phone }: Props) => {
    const { data: user } = useSWR<IUser>("swr.user.me");
    const { data } = useSWR<IWallet>(`swr.giftWallet.${payment}`, async () => {
        const { data } = await UserApi.getWallet(payment);
        return data;
    });

    const { data: check, } = useSWR(`swr.check.${payment}.${phone}`, async () => {
        const res = await UserApi.checkGift(data?.invoiceId || "", user?._id || "", phone);
        return res;
    });

    const renderItem = useCallback(({ item }: { item: IBank }) => {
        return <Banks item={item} />;
    }, []);

    useEffect(() => {
        if (check?.success) {
            goBack();
            closeBottomSheet();
            return;
        }
    }, [check?.success, closeBottomSheet, goBack]);

    return (
      <>
        <View style={styles.header}>
          <TouchableOpacity onPress={closeBottomSheet} style={styles.backButton}>
            <AntDesign color={Colors.black} name="left" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{(egg * 20000).toLocaleString()} ₮</Text>
          <TouchableOpacity style={styles.backButton}>
            <AntDesign color={Colors.white} name="retweet" size={24} />
          </TouchableOpacity>
        </View>
        <View style={styles.divider} />
        <BottomSheetFlatList
                columnWrapperStyle={styles.container}
                data={data?.urls}
                keyExtractor={item => item._id}
                numColumns={3}
                renderItem={renderItem}
            />
      </>
    );
});

GiftQpaySheet.displayName = "GiftQpaySheet";

export { GiftQpaySheet };

const styles = StyleSheet.create({
    container: {
        gap             : 10,
        marginHorizontal: 12
    },
    backButton: {
        padding         : 8,
        marginHorizontal: 8
    },
    divider: {
        borderWidth : 1,
        borderColor : Colors.border,
        marginBottom: 10
    },
    header: {
        flexDirection : "row",
        alignItems    : "center",
        justifyContent: "space-between",
        paddingBottom : 10
    },
    headerTitle: {
        fontSize  : 24,
        color     : Colors.black,
        fontFamily: "MonBold"
    }
});
