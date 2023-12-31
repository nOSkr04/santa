import { FlatList, StyleSheet, View, ViewToken } from "react-native";
import React, { memo, useCallback } from "react";

import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { OnboardingData, data } from "../../components/animate-board/data";
import { BoardCard } from "../../components/animate-board/board-card";
import { Pagination } from "../../components/animate-board/pagination";
import { CustomButton } from "../../components/animate-board/custom-button";
import { Colors } from "../../constants/colors";

const OnBoardScreen = memo(() => {
  const flatListRef = useAnimatedRef<FlatList<OnboardingData>>();
  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);

  const renderItem = useCallback(
    ({ item, index }: { item: OnboardingData; index: number }) => {
      return <BoardCard index={index} item={item} x={x} />;
    },
    [x],
  );

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      x.value = event.contentOffset.x;
    },
  });

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems[0]?.index !== null) {
      flatListIndex.value = viewableItems[0]?.index;
    }
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        bounces={false}
        data={data}
        horizontal={true}
        keyExtractor={item => item._id}
        onScroll={onScroll}
        onViewableItemsChanged={onViewableItemsChanged}
        pagingEnabled={true}
        ref={flatListRef}
        renderItem={renderItem}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        viewabilityConfig={{
          minimumViewTime                 : 300,
          viewAreaCoveragePercentThreshold: 10,
        }}
      />
      <View style={styles.bottomContainer}>
        <Pagination data={data} x={x} />
        <CustomButton
          dataLength={data.length}
          flatListIndex={flatListIndex}
          flatListRef={flatListRef}
          x={x}
        />
      </View>
    </View>
  );
});

OnBoardScreen.displayName = "OnBoardScreen";

export { OnBoardScreen };

const styles = StyleSheet.create({
  container: {
    flex           : 1,
    backgroundColor: Colors.white,
  },
  bottomContainer: {
    flexDirection   : "row",
    justifyContent  : "space-between",
    alignItems      : "center",
    marginHorizontal: 30,
    paddingVertical : 30,
    position        : "absolute",
    bottom          : 20,
    left            : 0,
    right           : 0,
  },
});
