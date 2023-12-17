/* eslint-disable react/no-unstable-nested-components */
import React, { memo, useCallback, useState } from "react";
import {  StyleSheet, View } from "react-native";
import { MaterialTabBar, Tabs } from "react-native-collapsible-tab-view";
import { Drawer } from "react-native-drawer-layout";
import { Colors } from "../../constants/colors";
import AppBar from "../../components/header/app-bar";
import { Banner } from "../../components/home/banner";
import { DrawerContent } from "../../components/home/drawer-content";
import { DrawerSceneWrapper } from "../../components/home/drawer-scene-wrapper";
import { GiftTab } from "../../components/home/gift-tab";
import { VoucherTab } from "../../components/home/voucher-tab";
import { LabelRender } from "../../components/home/label-render";

const HEADER_HEIGHT = 250;
const Header = () => {
  return <Banner />;
};

const HomeScreen = memo(() => {
  const [open, setOpen] = useState(false);

  const closeDrawer = useCallback(() => {
    setOpen(false);
  }, []);

  const openDrawer = useCallback(() => {
    setOpen(true);
  }, []);
  return (
    <Drawer
      drawerPosition="left"
      drawerStyle={styles.drawer}
      drawerType="slide"
      onClose={closeDrawer}
      onOpen={openDrawer}
      open={open}
      overlayStyle={styles.overlay}
      renderDrawerContent={() => {
        return <DrawerContent />;
      }}
      style={styles.root}
    >
      <DrawerSceneWrapper>
        <View style={styles.root}>
          <View style={styles.header}>
            <AppBar openDrawer={openDrawer} />
          </View>
          <Tabs.Container
            allowHeaderOverscroll
            headerHeight={HEADER_HEIGHT}
            lazy
            renderHeader={Header}
            renderTabBar={props => (
              <MaterialTabBar
                  {...props}
                  indicatorStyle={{ backgroundColor: Colors.primary }}
                  />
            )}
    
          >
            <Tabs.Tab label={({ name }) => <LabelRender name={name} />} name="Gift" >
              <GiftTab />
            </Tabs.Tab>
            <Tabs.Tab label={({ name }) => <LabelRender name={name} />} name="Voucher">
              <VoucherTab />
            </Tabs.Tab>
          </Tabs.Container>
        </View>
      </DrawerSceneWrapper>
    </Drawer>
  );
});

HomeScreen.displayName = "HomeScreen";

const styles = StyleSheet.create({
  root: {
    flex           : 1,
    backgroundColor: Colors.white,
  },
  header: {
    zIndex: 10
  },
  drawer: {
    backgroundColor: Colors.white
  },
  overlay: {
    backgroundColor: Colors.transparent,
  },

});

export { HomeScreen };
