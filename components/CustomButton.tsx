import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { router } from 'expo-router';
import { setItem } from '@/utils/asyncStorage';
const CustomButton = ({ flatListRef, flatListIndex, dataLength }: any) => {
  const buttonAnimationStyle = useAnimatedStyle(() => {
    return {
      width:
        flatListIndex.value === dataLength - 1
          ? withSpring(140)
          : withSpring(60),
      height: 60,
    };
  });
  const arrowAnimationStyle = useAnimatedStyle(() => {
    return {
      fontSize: 24,
      opacity:
        flatListIndex.value === dataLength - 1 ? withTiming(0) : withTiming(1),
      transform: [
        {
          translateX:
            flatListIndex.value === dataLength - 1
              ? withTiming(100)
              : withTiming(0),
        },
      ],
    };
  });
  const textAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity:
        flatListIndex.value === dataLength - 1 ? withTiming(1) : withTiming(0),
      transform: [
        {
          translateX:
            flatListIndex.value === dataLength - 1
              ? withTiming(0)
              : withTiming(-100),
        },
      ],
    };
  });
  const handleDone = () => {
    setItem('onboarded', '1');
    router.push('/sign-up');
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (flatListIndex.value < dataLength - 1) {
          flatListRef.current.scrollToIndex({ index: flatListIndex.value + 1 });
        } else {
          handleDone();
        }
      }}
    >
      <Animated.View style={[styles.container, buttonAnimationStyle]}>
        <Animated.Text style={[styles.textButton, textAnimationStyle]}>
          Get Started
        </Animated.Text>
        <Animated.View style={[styles.iconsContainer, arrowAnimationStyle]}>
          <AntDesign name="arrowright" style={styles.icons} />
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  icons: {
    color: '#fff',
    fontSize: 24,
  },
  iconsContainer: {
    position: 'absolute',
  },
  textButton: {
    color: '#fff',
    fontSize: 16,
    position: 'absolute',
  },
});
