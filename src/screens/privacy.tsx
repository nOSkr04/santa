import { Dimensions,  ScrollView,StyleSheet,  View } from "react-native";
import React,{ memo, useMemo } from "react";
import { Colors } from "../constants/colors";
import RenderHTML from "react-native-render-html";
import { BackAppBar } from "../components/header/back-app-bar";

const width = Dimensions.get("screen").width;

const PrivacyScreen = memo(() => {

    const tagsStyles = useMemo(() => (
        {
            h1: {
                color: Colors.black,
            },
            p: {
                color: Colors.black,
            },
            li: {
                color: Colors.black
            },
            ol: {
                color: Colors.black
            },
            h2: {
                color: Colors.black
            }
        }
    ), []);
    
    const source = {
        html: `
        <h2>Үйлчилгээний нөхцөл</h2>
        <div className="blog__details-left">
        <h3 className="mb-20">Товч үйлчилгээний нөхцөл</h3>
        <h5>1. Ерөнхий</h5>
        <li className="ml-50 mt-3">
          1. Santa.mn-р дамжуулан өндөг олгох, авах, түүнийг ашиглах,
          хэрэглэхтэй холбоотой үүсэх харилцааг зохицуулахад оршино.
        </li>
        <li className="ml-50 mt-3">
          2. Энэхүү үйлчилгээний товч нөхцлийг дээрх үйлчилгээг авахаас
          өмнө хэрэглэгч хүлээн зөвшөөрч баталгаажуулсны үндсэн дээр
          хэрэгжинэ.
        </li>
        <li className="ml-50 mt-3">
          3. Santa.mn болон энэхүү өндөгын үйл ажиллагаатай холбоотой
          мэдээ мэдээлэл, контент, нийтлэл, хичээлийг зөвшөөрөлгүй түгээх,
          хуулбарлах бүх үйлдлийг хориглоно.
        </li>
        <h5 className="mt-5">2. Бүртгэл</h5>
        <li className="ml-50 mt-3">
          1. өндөг хамрагдахын тулд хэрэглэгч бүртгэл үүсгэсэн байна.
          Ингэхдээ нэвтрэх “Нэр” болон “Нууц үгийг” өөрт тохируулан үүсгэж
          үүнийгээ мартахгүй байх үүргийг хүлээнэ.
        </li>
        <li className="ml-50 mt-3">
          2. Хэрэглэгчийн мэдээллийн нууцлалыг Santa.mn хамгаална,
          задруулахгүй.
        </li>
        <h5 className="mt-5">3. Төлбөр</h5>
        <li className="ml-50 mt-3">
          1. Хэрэглэгч заагдсан үнийн дүнгээр төлбөрөө төлнө.
        </li>
        <li className="ml-50 mt-3">
          2. Хэрэглэгч төлбөрөө төлөхөөс өмнө шийдвэрээ бүрэн зөв гаргасан
          байх ба төлсний дараа төлбөр буцаагдахгүй.
        </li>
      </div>
        <p>&nbsp;</p>`
    };
    return (
      <>
        <BackAppBar sharedTag="privacyText" title="Үйлчилгээний нөхцөл"  />
        <View style={styles.divider}  />
        <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
          <RenderHTML
                contentWidth={width}
                source={source}
                tagsStyles={tagsStyles}
            />
        </ScrollView>
      </>
    );
  });

  PrivacyScreen.displayName="PrivacyScreen";

export { PrivacyScreen };

const styles = StyleSheet.create({
    container: {
        flexDirection    : "row",
        alignItems       : "center",
        justifyContent   : "space-between",
        paddingHorizontal: 12,
        backgroundColor  : Colors.white,
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
    content: {
        flex             : 1,
        backgroundColor  : Colors.white,
        paddingHorizontal: 20
    }
});