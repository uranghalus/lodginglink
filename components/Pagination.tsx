import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface PaginationI {
  data: any;
  x: any;
  screenWidth: any;
}
const Pagination: React.FC<PaginationI> = ({ data, screenWidth, x }) => {
  const PaginationComp = ({ i }: any) => {
    const animatedDotStyle = useAnimatedStyle(() => {
      const widthAnimation = interpolate(
        x.value,
        [(i - 1) * screenWidth, i * screenWidth, (i + 1) * screenWidth],
        [10, 30, 10],
        Extrapolation.CLAMP
      );
      const opacityAnimation = interpolate(
        x.value,
        [(i - 1) * screenWidth, i * screenWidth, (i + 1) * screenWidth],
        [0.5, 1, 0.5],
        Extrapolation.CLAMP
      );
      return {
        width: widthAnimation,
        opacity: opacityAnimation,
      };
    });
    return <Animated.View style={[styles.dot, animatedDotStyle]} key={i} />;
  };
  return (
    <View style={styles.paginationContainer}>
      {data.map((_: any, index: any) => {
        return <PaginationComp i={index} key={index} />;
      })}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 8,
    backgroundColor: Colors.primary,
    marginHorizontal: 5,
    borderRadius: 5,
  },
});
