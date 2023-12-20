import { RefreshControl,   StyleSheet,   View } from "react-native";
import React, { memo, useCallback } from "react";
import useSWRInfinite from "swr/infinite";
import { GiftApi } from "../../api";
import { IGift } from "../../interfaces/gift";
import { GiftCard } from "../../components/home/gift";
import { Tabs } from "react-native-collapsible-tab-view";
import { Colors } from "../../constants/colors";
import { FadeOutDown, ZoomInEasyDown } from "react-native-reanimated";
import { Stagger } from "../animate/stagger-animate";
import { Loading } from "../common/loading";

const GiftTab = memo(() => {
  const { data, size, setSize, isLoading } = useSWRInfinite(
    index => `swr.gifts.${index}`,
    async (index) => {
      const page = index.split(".").pop();
      const res = await GiftApi.getGifts({
        page: parseInt(`${page || 1}`, 10) + 1
      });
      return res;
    }
  );

  const renderItem = useCallback(({ item, index }: { item: IGift, index: number }) => {
    const style = () => {
      return {
        marginLeft : index % 2 !== 0 ? 5 : 12,
        marginRight: index % 2 !== 0 ? 12 : 5,
        marginTop  : 10,
      };
    };
    return (
      <Stagger
        duration={100}
        entering={() => ZoomInEasyDown.springify()}
        exitDirection={-1}
        exiting={() => FadeOutDown.springify()}
        stagger={50}
      >
        <View style={style()}>
          <GiftCard item={item} />
        </View>
      </Stagger>
    );
  }, []);

  const renderEmpty = useCallback(() => {
    if(isLoading){
     return (
       <View style={styles.loader}>
         <Loading/>
       </View>
     );
    }
    return <></>;
  },[isLoading]);

  return (
    <Tabs.FlashList
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.container}
        data={(data || []).map(entry => entry?.data).flat() as IGift[]}
        estimatedItemSize={250}
        keyExtractor={item => item._id}
        numColumns={2}
        onEndReached={() => {
          if (size < 3) {
            return;
          }
          setSize(size + 1);
        }}
        onEndReachedThreshold={0.8}
        refreshControl={
          <RefreshControl
            onRefresh={() => {
              setSize(1);
            }}
            refreshing={isLoading}
          />}
        renderItem={renderItem}
        style={styles.container}
      />
  );
});

GiftTab.displayName = "GiftTab";

export { GiftTab };

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white
  },
  loader: {
    flex          : 1,
    alignItems    : "center",
    justifyContent: "center"
  }
});
