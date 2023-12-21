import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import React, { memo, useMemo } from "react";
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
        1. Santa.mn-р дамжуулан өндөг худалдан авах, шилжүүлэх, задлах болон хадгалах, өндөг
задлан бэлэг түгээх зэрэгтэй холбоотой нэг удаагийн хөтөлбөрт үйл явдлын үйл
ажиллагааг зохицуулна.
        </li>
        <li className="ml-50 mt-3">
        2. “Өндөг” гэдэг нь дотроо ямар нэгэн бэлэг авах тус хэрэглэгчийн эрх юм.
        </li>
        <li className="ml-50 mt-3">
        3. “Өндөг” дотроос гарч ирэх бэлгэд 20 төрлийн биет, 24 төрлийн биет бус хөнгөлөлтийн
эрхүүд багтана. Үүнээс аль нэг нь товлосон хугацаанд хэрэглэгчид санамсаргүй байдлаар
олгогдох болно.
        </li>
        <li className="ml-50 mt-3">
        4. Santa.mn нь өндөг худалдах, бэлэг олгох үйл ажиллагааг дангаар хариуцаж хэрэглэгчид
        чиглэл үзүүлэх тул бусад этгээд дамжуулан зарах, худалдахыг хориглоно.
        </li>
        <h5 className="mt-5">2. Бүртгэл</h5>
        <li className="ml-50 mt-3">
        1. Тус нэг удаагийн хөтөлбөрт хамрагдахын тулд хэрэглэгч бүртгэл үүсгэсэн байна.
        Ингэхдээ нэвтрэх “Нэр” болон “Нууц пин код” өөрт тохируулан үүсгэж үүнийгээ мартахгүй
        байх үүргийг хэрэглэгч өөрөө хүлээнэ.
        </li>
        <li className="ml-50 mt-3">
        2. Хэрэглэгчийн мэдээлэлд хамгийн чухал нь өөрийн утасны дугаар бөгөөд өөрийн нэр
        дээрх ашигладаг утасны дугаар нь тус хүнийг өөрийг нь гэдгийг нотлох гол шалгуур болно.        
        </li>
        <li className="ml-50 mt-3">
        4. Хэрэглэгчийн мэдээллийн нууцлалыг Santa.mn хамгаална, задруулахгүй.
        </li>
        <h5 className="mt-5">3. Төлбөр</h5>
        <li className="ml-50 mt-3">
        1. Хэрэглэгч заагдсан үнийн дүнгээр төлбөрөө төлөх буюу 1 өндгийг 20,000₮ /хорин мянган
        төгрөг/-р худалдаална
        </li>
        <li className="ml-50 mt-3">
        2. Хэрэглэгч төлбөрөө төлөхөөс өмнө шийдвэрээ бүрэн зөв гаргасан байх ёстой ба төлбөр
        төлөгдсөний дараа буцаагдахгүй.        
        </li>
        <h5 className="mt-5">4. Бэлэг түгээх /Өндөг задлах/        </h5>
        <li className="ml-50 mt-3">
        1. Бэлэг түгээх үйл ажиллагааг нийтэд хүлээн зөвшөөрөгдсөн олон улсад хэрэглэгддэг
        дурын байдлаар бэлгийн эзэд, төрлүүдийг хуваарилах боломжтой онлайн веб хуудас
        ашиглан хэрэглэгчдийн өмнө ил тод явуулна.        
        </li>
        <li className="ml-50 mt-3">
        2. Бэлэг түгээх үйл ажиллагаа 2023.01.01-ний өдрийн шөнийн 01:00 цагт нийгмийн
сүлжээнд #LIVE хувилбараар цацагдана.       
        </li>
        <li className="ml-50 mt-3">
        3. Бэлэг түгээхдээ нийтээр хүлээж зөвшөөрөх нийтлэг хэмжүүр мөрдөгдөж бүхний өмнө ил
        тод явагдах тул хэрэглэгч өөрөө үүнд хяналт тавих, бэлэг түгээлтийн дараа онцгой
        тохиолдлоос бусад нөхцөлд гомдол гаргахгүй байх үүрэгтэй
        </li>
        <li className="ml-50 mt-3">
        4. Өндөг бүрт дотроо ямар нэгэн бэлэгтэй байна. Энэ нь биет эсвэл биет бус хөнгөлөлтийн
        эрх байна.
        </li>
      </div>
        <p>&nbsp;</p>`
  };
  return (
    <>
      <BackAppBar sharedTag="privacyText" title="Үйлчилгээний нөхцөл" />
      <View style={styles.divider} />
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

PrivacyScreen.displayName = "PrivacyScreen";

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