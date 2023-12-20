import { RefreshControl,   StyleSheet,   View } from "react-native";
import React, { memo, useCallback } from "react";
import useSWRInfinite from "swr/infinite";
import { GiftApi } from "../../api";
import { IGift } from "../../interfaces/gift";
import { GiftCard } from "../../components/home/gift";
import { Tabs } from "react-native-collapsible-tab-view";
import { Loading } from "../common/loading";

const VoucherTab = memo(() => {
  const { data, size, setSize, isLoading } = useSWRInfinite(
    index => `swr.vouchers.${index}`,
    async (index) => {
      const page = index.split(".").pop();
      const res = await GiftApi.getVouchers({
        page: parseInt(`${page || 1}`, 10) +1
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
      <View style={style()}>
        <GiftCard item={item} />
      </View>
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
      />
  );
});

VoucherTab.displayName = "VoucherTab";

export { VoucherTab };

const styles = StyleSheet.create({
  loader: {
    flex          : 1,
    alignItems    : "center",
    justifyContent: "center"
  }
});
