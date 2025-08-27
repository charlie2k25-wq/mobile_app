import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="auth/login" options={{ headerShown: false }} />
        <Stack.Screen name="auth/register" options={{ headerShown: false }} />
        <Stack.Screen name="groups/index" options={{ headerShown: false }} />
        <Stack.Screen name="downloads/index" options={{ headerShown: false }} />
        <Stack.Screen name="post/story" options={{ headerShown: false }} />
        <Stack.Screen name="post/update" options={{ headerShown: false }} />
        <Stack.Screen name="post/podcast" options={{ headerShown: false }} />
        <Stack.Screen name="store/upload" options={{ headerShown: false }} />
        <Stack.Screen name="store/dashboard" options={{ headerShown: false }} />
        <Stack.Screen name="store/reviews" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}