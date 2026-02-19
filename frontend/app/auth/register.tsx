import { useState } from 'react';
import { View, Pressable, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Image, Dimensions } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

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
              className="w-10 h-10 bg-gray-100 rounded-xl items-center justify-center mb-6"
            >
              <Ionicons name="chevron-back" size={24} color="#1f2937" />
            </TouchableOpacity>

            <Animated.View entering={FadeInUp.duration(1000).springify()} className="mb-10">
              <Text className="text-3xl font-bold text-gray-900 mb-3">
                Hello! Register to get started
              </Text>
            </Animated.View>

            <Animated.View entering={FadeInDown.duration(1000).springify()} className="space-y-4">
              
               <View className="space-y-2 mb-2">
                <TextInput 
                  placeholder="Username" 
                  value={name}
                  onChangeText={setName}
                  placeholderTextColor="#9ca3af"
                  className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-4 text-gray-900 font-medium text-base focus:border-gray-900 focus:bg-white"
                />
              </View>

              <View className="space-y-2 mb-2">
                <TextInput 
                  placeholder="Email" 
                  value={email}
                  onChangeText={setEmail}
                  placeholderTextColor="#9ca3af"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-4 text-gray-900 font-medium text-base focus:border-gray-900 focus:bg-white"
                />
              </View>

              <View className="space-y-2 mb-2">
                <View className="relative w-full">
                  <TextInput 
                    placeholder="Password" 
                    value={password}
                    onChangeText={setPassword}
                    placeholderTextColor="#9ca3af"
                    secureTextEntry={!showPassword}
                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-4 text-gray-900 font-medium text-base focus:border-gray-900 focus:bg-white pr-12"
                  />
                  <Pressable 
                    onPress={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-4"
                  >
                    <Ionicons 
                      name={showPassword ? "eye-off-outline" : "eye-outline"} 
                      size={20} 
                      color="#6b7280" 
                    />
                  </Pressable>
                </View>
              </View>

              <View className="space-y-2  mb-2">
                  <View className="relative w-full">
                  <TextInput 
                    placeholder="Confirm Password" 
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholderTextColor="#9ca3af"
                    secureTextEntry={!showPassword}
                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-4 text-gray-900 font-medium text-base focus:border-gray-900 focus:bg-white pr-12"
                  />
                  <Pressable 
                    onPress={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-4"
                  >
                    <Ionicons 
                      name={showPassword ? "eye-off-outline" : "eye-outline"} 
                      size={20} 
                      color="#6b7280" 
                    />
                  </Pressable>
                </View>
              </View>

              <TouchableOpacity className="w-full bg-gray-900 py-4 rounded-xl items-center shadow-lg active:bg-gray-800 mt-4">
                <Text className="text-white font-bold text-lg">Register</Text>
              </TouchableOpacity>

              <View className="flex-row items-center my-8">
                <View className="flex-1 h-[1px] bg-gray-200" />
                <Text className="mx-4 text-gray-400 font-medium">Or Register with</Text>
                <View className="flex-1 h-[1px] bg-gray-200" />
              </View>

              <View className="flex-row justify-center gap-6 mt-2">
                <TouchableOpacity className="bg-white border border-gray-200 p-4 rounded-xl items-center active:bg-gray-50 shadow-sm w-20 h-20 justify-center">
                   <Image 
                      source={{ uri: 'https://cdn-icons-png.flaticon.com/512/300/300221.png' }} 
                      className="w-8 h-8"
                      resizeMode="contain"
                    />
                </TouchableOpacity>
                <TouchableOpacity className="bg-white border border-gray-200 p-4 rounded-xl items-center active:bg-gray-50 shadow-sm w-20 h-20 justify-center">
                    <Image 
                      source={{ uri: 'https://cdn-icons-png.flaticon.com/512/25/25231.png' }} 
                      className="w-8 h-8"
                      resizeMode="contain"
                    />
                </TouchableOpacity>
              </View>

              <View className="flex-row justify-center mt-8 mb-4">
                <Text className="text-gray-500 font-medium">Already have an account? </Text>
                <Link href="/auth/login" asChild>
                  <TouchableOpacity>
                    <Text className="text-blue-600 font-bold">Login Now</Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}