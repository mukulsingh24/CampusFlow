import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  TouchableWithoutFeedback, 
  Keyboard
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

export default function Forgot() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 px-8 pt-4">
            
            <TouchableOpacity 
              onPress={() => router.back()} 
              className="w-10 h-10 bg-gray-100 rounded-xl items-center justify-center mb-10"
            >
              <Ionicons name="chevron-back" size={24} color="#1f2937" />
            </TouchableOpacity>

            <Animated.View entering={FadeInUp.duration(1000).springify()} className="mb-12">
              <Text className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Forgot Password?
              </Text>
              <Text className="text-xl text-gray-500 font-medium leading-relaxed">
                Don't worry! It happens. Please enter the email address linked with your account.
              </Text>
            </Animated.View>

            <Animated.View entering={FadeInDown.duration(1000).springify()} className="space-y-8">
              
              <View className="space-y-4 mb-3 ">
                <TextInput 
                  placeholder="Enter your email" 
                  value={email}
                  onChangeText={setEmail}
                  placeholderTextColor="#9ca3af"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-5 text-gray-900 font-medium text-lg focus:border-gray-900 focus:bg-white"
                />
              </View>

              <TouchableOpacity 
                className="w-full bg-gray-900 py-5 rounded-xl items-center shadow-lg active:bg-gray-800"
                onPress={() => console.log('Send Code Pressed')}
              >
                <Text className="text-white font-bold text-xl">Send Code</Text>
              </TouchableOpacity>

            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}