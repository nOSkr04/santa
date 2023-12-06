import { StyleSheet, Text, View } from 'react-native'
import React, { memo, useCallback, useState } from 'react'
import { Drawer } from "react-native-drawer-layout";
import { Colors } from '../../constants/colors';
import { DrawerContent } from '../../components/home/drawer-content';
import { DrawerSceneWrapper } from '../../components/home/drawer-scene-wrapper';
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
        <Text>HomeScreen</Text>
        </DrawerSceneWrapper>
      </Drawer>
    )
  })

  HomeScreen.displayName="HomeScreen"

export {HomeScreen}

const styles = StyleSheet.create({
    overlay: {
        backgroundColor: Colors.transparent,
      },
      drawer: { backgroundColor: Colors.primary },
      root: {
        flex: 1,
        backgroundColor: Colors.primary,
      },
})