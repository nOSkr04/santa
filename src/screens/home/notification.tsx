import { RefreshControl, StyleSheet, View } from "react-native";
import React, { memo, useCallback } from "react";
import { NotificationBackAppBar } from "../../components/header/notification-back-app-bar";
import { Colors } from "../../constants/colors";
import { FlashList } from "@shopify/flash-list";
import useSWRInfinite from "swr/infinite";
import { NotificationApi } from "../../api";
import { INotification } from "../../interfaces/notification";
import { NotificationCard } from "../../components/notification/notification-card";

const NotificationScreen = memo(() => {
  const { data, size, setSize, isLoading } = useSWRInfinite(
    index => `swr.notifcation.${index}`,
    async (index) => {
      const page = index.split(".").pop();
      const { data } = await NotificationApi.getNotificaiton({
        page: parseInt(`${page || 1}`, 10)
      });
      return data;
    },
    { revalidateAll: true }

  );

  console.log(data?.flat());

  // console.log((data || []).map(entry => entry?.data).flat());

  const renderItem = useCallback(({ item }: { item: INotification }) => {
    if(!item){
      return null;
    }
    return <NotificationCard item={item} />;
  }, []);

  return (
    <>
      <NotificationBackAppBar sharedTag="notifficationTitle" title="Мэдэгдэл" />
      <View style={styles.container}>
        <FlashList 
        data={data?.flat()} 
        estimatedItemSize={150} 
        keyExtractor={item => item._id}
        onEndReached={() => setSize(size + 1)}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            onRefresh={() => {
              setSize(1);
            }}
            refreshing={isLoading}
          />
        }
        renderItem={renderItem} 
        showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
});

NotificationScreen.displayName = "NotificationScreen";

export { NotificationScreen };

const styles = StyleSheet.create({
  container: {
    flex           : 1,
    backgroundColor: Colors.primary
  }
});