import { RefreshControl, StatusBar, StyleSheet, View } from "react-native";
import React, { memo, useCallback, useState } from "react";
import { Drawer } from "react-native-drawer-layout";
import { Colors } from "../../constants/colors";
import { DrawerContent } from "../../components/home/drawer-content";
import { DrawerSceneWrapper } from "../../components/home/drawer-scene-wrapper";
import AppBar from "../../components/header/app-bar";
import { Banner } from "../../components/home/banner";
import { GiftCard } from "../../components/home/gift";
import { FlashList } from "@shopify/flash-list";
import useSWRInfinite from "swr/infinite";
import { GiftApi } from "../../api";
import { IGift } from "../../interfaces/gift";
const HomeScreen = memo(() => {
  const [open, setOpen] = useState(false);
  const closeDrawer = useCallback(() => {
    setOpen(false);
  }, []);
  const openDrawer = useCallback(() => {
    setOpen(true);
  }, []);

  const { data, size, setSize, isLoading } = useSWRInfinite(
    index => `swr.gifts.${index}`,
    async (index) => {
      const page = index.split(".").pop();
      const res = await GiftApi.getGifts({
        page: parseInt(`${page || 1}`, 10)
      });
      return res;
    }

  );

  const renderItem = useCallback(({ item, index }: { item: any, index: number }) => {
    const style = () => {
      return {
        marginLeft : index % 2 !== 0 ? 5 : 12,
        marginRight: index % 2 !== 0 ? 20 : 5,
        marginTop  : 10,
      };
    };
    return (
      <View style={style()}>
        <GiftCard item={item} />
      </View>
    );
  }, []);

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
          <StatusBar backgroundColor={Colors.primary} />
          <AppBar openDrawer={openDrawer} />
          <View style={styles.container}>
            <FlashList 
            ListHeaderComponent={<Banner />}
            data={(data || []).map(entry => entry?.data).flat() as IGift[]}
             estimatedItemSize={250}
              keyExtractor={item => item._id} 
              numColumns={2} 
              onEndReached={() => {
                if(size < 3){
                  return;
                }
                setSize(size + 1);}}
              onEndReachedThreshold={0.8} 
              refreshControl={
                <RefreshControl
                  onRefresh={() => {
                    setSize(1);
                  }}
                  refreshing={isLoading}
              />
              }
              renderItem={renderItem} 
              />
          </View>
        </>
      </DrawerSceneWrapper>
    </Drawer>
  );
});

HomeScreen.displayName = "HomeScreen";

export { HomeScreen };

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: Colors.transparent,
  },
  drawer: { backgroundColor: Colors.third },
  root  : {
    flex           : 1,
    backgroundColor: Colors.third,
  },
  container: {
    flex           : 1,
    backgroundColor: Colors.background
  }
});