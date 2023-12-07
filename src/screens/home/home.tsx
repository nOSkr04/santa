import { StyleSheet, Text, View } from 'react-native'
import React, { memo, useCallback, useState } from 'react'
import { Drawer } from "react-native-drawer-layout";
import { Colors } from '../../constants/colors';
import { DrawerContent } from '../../components/home/drawer-content';
import { DrawerSceneWrapper } from '../../components/home/drawer-scene-wrapper';
import AppBar from '../../components/header/app-bar';
import { Banner } from '../../components/home/banner';
import { GiftCard } from '../../components/home/gift';
import { FlashList } from '@shopify/flash-list';
const HomeScreen = memo(() => {
  const [open, setOpen] = useState(false);
  const closeDrawer = useCallback(() => {
    setOpen(false);
  }, []);
  const openDrawer = useCallback(() => {
    setOpen(true);
  }, []);

  const data = [
    {
      _id: "6563a86b67377d7e18901222",
      name: "PlayStation 5",
      type: "Бүтээгдэхүүн",
      image: {
        blurHash: "LUQvtItR-;WB%gayRjfQ_NRiIUof",
        url: "https://techstory.in/wp-content/uploads/2022/03/ps5.png",
        height: 150
      },
    },
    {
      _id: "6563a86b67377d7e1890122232",
      name: "PlayStation 5",
      type: "Бүтээгдэхүүн",
      image: {
        blurHash: "LUQvtItR-;WB%gayRjfQ_NRiIUof",
        url: "https://techstory.in/wp-content/uploads/2022/03/ps5.png",
        height: 250
      },
    },
    {
      _id: "6563a86bfsd67377d7e18901221312",
      name: "PlayStation 5",
      type: "Бүтээгдэхүүн",
      image: {
        blurHash: "LUQvtItR-;WB%gayRjfQ_NRiIUof",
        url: "https://techstory.in/wp-content/uploads/2022/03/ps5.png",
        height: 200
      },
    },
    {
      _id: "6563a86b67377d7e1890sdf122312",
      name: "PlayStation 5",
      type: "Бүтээгдэхүүн",
      image: {
        blurHash: "LUQvtItR-;WB%gayRjfQ_NRiIUof",
        url: "https://techstory.in/wp-content/uploads/2022/03/ps5.png",
        height: 180
      },
    },
    {
      _id: "6563a86b673dfso77d7e18901222",
      name: "PlayStation 5",
      type: "Бүтээгдэхүүн",
      image: {
        blurHash: "LUQvtItR-;WB%gayRjfQ_NRiIUof",
        url: "https://techstory.in/wp-content/uploads/2022/03/ps5.png",
        height: 300
      },
    },
  ]
  const renderItem = useCallback(({ item, index }: { item: any, index: number }) => {
    const style = () => {
      return {
        marginLeft: index % 2 !== 0 ? 5 : 12,
        marginRight: index % 2 !== 0 ? 20 : 5,
        marginTop: 10,
      };
    };
    return (
    <View style={style()}>
      <GiftCard item={item} />
    </View>
    )
  }, [])

  return (
    <Drawer
      drawerPosition="left"
      drawerStyle={styles.drawer}
      drawerType="slide"
      hideStatusBarOnOpen={true}
      onClose={closeDrawer}
      onOpen={openDrawer}
      open={open}
      overlayStyle={styles.overlay}
      renderDrawerContent={() => {
        return <DrawerContent />;
      }}
      statusBarAnimation="fade"
      style={styles.root}
    >
      <DrawerSceneWrapper>
        <>
          <AppBar openDrawer={openDrawer} />
          <View style={styles.container}>
            <FlashList ListHeaderComponent={<Banner />} data={data} renderItem={renderItem} keyExtractor={item => item._id} numColumns={2} estimatedItemSize={250} />
          </View>
        </>
      </DrawerSceneWrapper>
    </Drawer>
  )
})

HomeScreen.displayName = "HomeScreen"

export { HomeScreen }

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: Colors.transparent,
  },
  drawer: { backgroundColor: Colors.third },
  root: {
    flex: 1,
    backgroundColor: Colors.third,
  },
  container: {
    flex: 1,
    backgroundColor:"#ffd1b8"
  }
})