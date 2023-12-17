import { StyleSheet, Text,  } from "react-native";
import React, { memo,  } from "react";
import { Colors } from "../../constants/colors";

const LabelRender = memo(({ name }: { name: string }) => {

    if (name === "Gift") {
        return <Text style={styles.title}>20 төрлийн бэлэг</Text>;
    }
    if (name === "Voucher") {
        return <Text style={styles.title}>24 төрлийн хөнгөлөлт</Text>;
    }
    return (
      <></>
    );
});

LabelRender.displayName = "LabelRender";

export { LabelRender };

const styles = StyleSheet.create({
    title: {
        color         : Colors.black,
        fontFamily    : "MonSemiBold",
        fontSize      : 14,
        textAlign     : "center",
        marginVertical: 8,
    },
   
});