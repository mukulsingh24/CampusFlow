import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

export default function Open() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      
      <View className="flex-[0.6] items-center justify-center relative bg-gray-50">
         <Image 
              source={require('../../assets/images/good-colleges.jpg')} 
              // style={{ width: '100%', height: 200 }} 
              className="w-full h-full scale-97"
              resizeMode="cover" />
          <View className="absolute w-full h-full bg-black/5" />
      </View>

      <View className="flex-[0.4] bg-white px-8 pt-12 rounded-t-[30px] -mt-10 shadow-2xl items-center">
        <Animated.View entering={FadeInUp.duration(1000).springify()} className="items-center mb-8 w-full">
           <Text className="text-4xl font-bold text-gray-900 text-center mb-3">
            Campus<Text className="text-blue-600">Flow</Text>
          </Text>
          <Text className="text-gray-500 text-center font-medium leading-relaxed px-2">
            Connect, collaborate, and manage your campus life with ease.
          </Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className="gap-y-4 w-full">
          <TouchableOpacity 
            className="w-full bg-gray-900 py-4 rounded-xl items-center shadow-lg active:opacity-90"
            onPress={() => router.push('/auth/login')}
          >
            <Text className="text-white font-bold text-lg">Login</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="w-full bg-gray-900 border border-gray-900 py-4 rounded-xl items-center active:bg-gray-50"
            onPress={() => router.push('/auth/register')}
          >
            <Text className="text-white font-bold text-lg">Register</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="w-full bg-indigo-600 border border-indigo-600 py-4 rounded-xl items-center active:bg-indigo-700"
            onPress={() => router.push('/features/expense')}
          >
            <Text className="text-white font-bold text-lg">Expense Tracker</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
      </View>
  );
}
