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
                color: Colors.white,
            },
            p: {
                color: Colors.white,
            },
            li: {
                color: Colors.white
            },
            ol: {
                color: Colors.white
            },
            h2: {
                color: Colors.white
            }
        }
    ), []);
    
    const source = {
        html: `
        <h2>Үйлчилгээний нөхцөл</h2>
        <ol>
        <li>Ерөнхий нөхцөл
        <ol>
        <li>Sedu апп нь хэрэглэгчид Бэлгийн боловсрол олгох мэдээ мэдээлэл, зураг, контент, сургалт, зөвлөгөө өгөхтэй холбоотой үүсэх харилцааг зохицуулахад оршино.</li>
        <li>Энэхүү нөхцөл нь хэрэглэгч дээрх үйлчилгээг авахаас өмнө хүлээн зөвшөөрч баталгаажуулсны үндсэн дээр хэрэгжинэ.</li>
        <li>Хэрэглэгч 18 нас хүрсэн, эрх зүйн бүрэн чадамжтай байна.</li>
        <li>Sedu апп дээрх мэдээ мэдээлэл, зураг, контент, сургалт, зөвлөгөөг ашиг олох зорилгоор хуулбарлаж олшруулах, дуурайх, өөр бусад ямар ч зүйлд ашиглахыг хориглоно.</li>
        </ol>
        </li>
        </ol>
        <ol start="2">
        <li>Хэрэглэгчийн бүртгэл
        <ol>
        <li>Sedu апп-р үйлчлүүлэхдээ хэрэглэгч бүртгүүлсэн байна. Бүртгэлд нэвтрэх нэр, нэвтрэх нууц пин код үүсгэж илгээхийг заасан хүснэгтэд бөглөнө.</li>
        <li>Хэрэглэгчийн мэдээллийн нууцлалыг бид бүрэн хамгаална.</li>
        <li>Хэрэглэгчийн мэдээллийн үнэн зөв, бодит байдалд хэрэглэгч бүрэн хариуцлага хүлээнэ.</li>
        <li>Хэрэглэгч өөрийн үүсгэсэн нэвтрэх нэр болон нэвтрэх пин кодоо мартсан тохиолдолд бид хариуцлага хүлээхгүй.</li>
        </ol>
        </li>
        <li>Төлбөр тооцоо
        <ol>
        <li>Хэрэглэгчийн эрх нээлгэхэд сарын 20,000 төгрөг байна.</li>
        <li>Төлбөр буцаагдахгүй.</li>
        <li>Төлбөрийг QPay шилжүүлгээр хийнэ.</li>
        </ol>
        </li>
        </ol>
        <ol start="4">
        <li>Бусад
        <ol>
        <li>Садар самуун явдалтай тэмцэх тухай хуульд заасан хязгаарлалтын хүрээнд олгох мэдээ мэдээлэл, зураг, контент, зөвлөгөөг танд хүргэх болно.</li>
        </ol>
        </li>
        </ol>
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
        backgroundColor  : Colors.primary,
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
        flex           : 1,
        backgroundColor: Colors.primary
    }
});