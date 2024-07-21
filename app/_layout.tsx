import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import { getItem } from '@/utils/asyncStorage';
SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [fontsLoaded, error] = useFonts({
    'Inter-Bold': Inter_700Bold,
    'Inter-Medium': Inter_500Medium,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Regular': Inter_400Regular,
  });
  useEffect(() => {
    const checkOnboarding = async () => {
      const onBoarded = await getItem('onboarded');
      if (onBoarded === '1') {
        setShowOnboarding(false);
      } else {
        setShowOnboarding(true);
      }
    };

    checkOnboarding();
    if (fontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (showOnboarding === null || !fontsLoaded) {
    return null; // Show a loading screen or nothing until fonts are loaded and onboarding status is checked
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {showOnboarding === true ? (
        <Stack.Screen name="index" />
      ) : (
        <Stack.Screen name="(auth)" />
      )}
    </Stack>
  );
}
