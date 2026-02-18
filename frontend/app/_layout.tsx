import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import {View,Text,TaskProvider} from 'react-native'
import "../global.css"

export default function RootLayout() {
  return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ title:"Home"}} />
        <Stack.Screen name="auth/login" options={{ title:"Login"}} />
        <Stack.Screen name="auth/register" options={{ title:"Register"}}/>
        <Stack.Screen name="auth/forgot" options={{ title:"Forgot"}}/>
      </Stack>
  );
}
