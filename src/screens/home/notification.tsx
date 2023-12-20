import { RefreshControl, StyleSheet, Text, View } from "react-native";
import React, { memo, useCallback } from "react";
import { NotificationBackAppBar } from "../../components/header/notification-back-app-bar";
import { Colors } from "../../constants/colors";
import { FlashList } from "@shopify/flash-list";
import useSWRInfinite from "swr/infinite";
import { NotificationApi } from "../../api";
import { INotification } from "../../interfaces/notification";
import { NotificationCard } from "../../components/notification/notification-card";
import { Loading } from "../../components/common/loading";
import { EmptyCard } from "../../components/common/empty";

const NotificationScreen = memo(() => {
  const { data, size, setSize, isLoading } = useSWRInfinite(
    index => `swr.notifcation.${index}`,
    async (index) => {
      const page = index.split(".").pop();
      const res = await NotificationApi.getNotificaiton({
        page: parseInt(`${page || 1}`, 10) + 1
      });
      return res;
    },
  );


  const renderItem = useCallback(({ item }: { item: INotification }) => {
    return <NotificationCard item={item} />;
  }, []);
  const keyExtractor = useCallback((item: INotification, i: number) => `${i}-${item._id}`, []);

  const renderEmpty = useCallback(() => {
    if (isLoading) {
      return (
        <View style={styles.loader}>
          <Loading title />
        </View>
      );
    }
    return (
      <EmptyCard
        description="Танд одоогоор мэдэгдэл ирээгүй байна"
        title="Мэдэгдэл хоосон байна"
      />
    );
  }, [isLoading]);

  return (
    <View style={styles.container}>
      <NotificationBackAppBar sharedTag="notifficationTitle" title="Мэдэгдэл" />
      <View style={styles.container}>
        <FlashList
          ListEmptyComponent={renderEmpty}
          ListHeaderComponent={<Text style={styles.title}>Нийт мэдэгдэл</Text>}
          data={(data || []).map(entry => entry?.data).flat()}
          estimatedItemSize={100}
          keyExtractor={keyExtractor}
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
    </View>
  );
});

NotificationScreen.displayName = "NotificationScreen";

export { NotificationScreen };

const styles = StyleSheet.create({
  container: {
    flex           : 1,
    backgroundColor: Colors.white
  },
  title: {
    marginHorizontal: 24,
    marginTop       : 12,
    fontSize        : 20,
    fontFamily      : "MonBold",
    color           : Colors.text
  },
  loader: {
    flex           : 1,
    backgroundColor: Colors.white,
    alignItems     : "center",
    justifyContent : "center"
  }
});