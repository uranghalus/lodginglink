import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import data from '@/constants/Data';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedRef,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import Pagination from '@/components/Pagination';
import CustomButton from '@/components/CustomButton';
const index = () => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const flatListRef = useAnimatedRef();
  const flatListIndex = useSharedValue(0);
  const x = useSharedValue(100);

  const onViewableItemsChanged = ({ viewableItems }: any) => {
    flatListIndex.value = viewableItems[0].index;
  };
  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  const RenderItem = ({ item, index }: any) => {
    const imageAnimationStyle = useAnimatedStyle(() => {
      const opacityAnimation = interpolate(
        x.value,
        [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        [0, 1, 0],
        Extrapolation.CLAMP
      );
      const translateYAnimation = interpolate(
        x.value,
        [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        [100, 0, 100],
        Extrapolation.CLAMP
      );
      return {
        opacity: opacityAnimation,
        width: SCREEN_WIDTH * 0.8,
        height: SCREEN_WIDTH * 0.8,
        transform: [{ translateY: translateYAnimation }],
      };
    });
    return (
      <View
        style={[styles.ItemsContainer, { width: SCREEN_WIDTH }]}
        key={index}
      >
        <Animated.Image
          source={item.image}
          style={imageAnimationStyle}
          resizeMode="contain"
        />
        <View>
          <Text style={styles.ItemsTitle}>{item.title}</Text>
          <Text style={styles.ItemsDescription}>{item.description}</Text>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.page}>
      <Animated.FlatList
        ref={flatListRef as any}
        onScroll={onScroll}
        data={data}
        renderItem={({ item, index }) => {
          return <RenderItem item={item} index={index} />;
        }}
        keyExtractor={(item) => `basicEntry-${item.id}`}
        scrollEventThrottle={16}
        horizontal={true}
        bounces={false}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
      />
      <View style={styles.bottomContainer}>
        <Pagination data={data} x={x} screenWidth={SCREEN_WIDTH} />
        <CustomButton
          flatListRef={flatListRef}
          flatListIndex={flatListIndex}
          dataLength={data.length}
        />
      </View>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  ItemsContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  ItemsTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: 0.35,
    textAlign: 'center',
  },
  ItemsDescription: {
    marginTop: 5,
    fontFamily: 'Inter-Regular',
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: 0.35,
    textAlign: 'center',
    color: '#59656F',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 20,
  },
});
