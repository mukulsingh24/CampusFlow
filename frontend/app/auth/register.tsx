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
    <View className="flex-1 bg-white">
      {/* U-Shaped Header Background */}
      <View className="absolute top-0 w-full h-[25vh] bg-blue-600 rounded-b-[50px] overflow-hidden">
         <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2670&auto=format&fit=crop' }} 
            className="w-full h-full opacity-60"
            resizeMode="cover"
         />
      </View>

      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-1">
              
              {/* Back Button positioned absolutely relative to SafeAreaView */}
              <TouchableOpacity 
                onPress={() => router.back()} 
                className="absolute top-4 left-8 w-10 h-10 bg-white/90 rounded-xl items-center justify-center shadow-sm z-50"
              >
                <Ionicons name="chevron-back" size={24} color="#1f2937" />
              </TouchableOpacity>

              <View className="flex-1 px-8 pt-8">
                <Animated.View entering={FadeInUp.duration(1000).springify()} className="mb-6 mt-32">
                  <Text className="text-3xl font-bold text-gray-900 mb-2">
                    Hello! Register to get started
                  </Text>
                </Animated.View>

                <Animated.View entering={FadeInDown.duration(1000).springify()}>
                    <View className="mb-5">
                      <TextInput
                        placeholder="Username"
                        value={name}
                        onChangeText={setName}
                        placeholderTextColor="#9ca3af"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-gray-900 font-medium text-base focus:border-gray-900 focus:bg-white"
                      />
                    </View>

                    <View className="mb-5">
                      <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        placeholderTextColor="#9ca3af"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-gray-900 font-medium text-base focus:border-gray-900 focus:bg-white"
                      />
                    </View>

                    <View className="relative w-full mb-5">
                      <TextInput 
                        placeholder="Password" 
                        value={password}
                        onChangeText={setPassword}
                        placeholderTextColor="#9ca3af"
                        secureTextEntry={!showPassword}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-gray-900 font-medium text-base focus:border-gray-900 focus:bg-white pr-12"
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

                    <View className="mb-5">
                      <TextInput
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry={!showPassword}
                        placeholderTextColor="#9ca3af"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-gray-900 font-medium text-base focus:border-gray-900 focus:bg-white"
                      />
                    </View>

                    <TouchableOpacity 
                      className="w-full bg-gray-900 py-4 rounded-xl items-center shadow-lg active:bg-gray-800 mt-4"
                    >
                      <Text className="text-white font-bold text-lg">Register</Text>
                    </TouchableOpacity>

                  {/* Divider */}
                  <View className="flex-row items-center my-6">
                    <View className="flex-1 h-[1px] bg-gray-200" />
                    <Text className="mx-4 text-gray-400 font-medium">Or Register with</Text>
                    <View className="flex-1 h-[1px] bg-gray-200" />
                  </View>

                  {/* Social Login Buttons */}
                  <View className="flex-row justify-center gap-6">
                     <TouchableOpacity className="bg-white border border-gray-200 p-4 rounded-xl items-center active:bg-gray-50 shadow-sm w-20 h-20 justify-center">
                        <Image 
                            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png' }}
                            className="w-8 h-8"
                          />
                      </TouchableOpacity>
                      <TouchableOpacity className="bg-white border border-gray-200 p-4 rounded-xl items-center active:bg-gray-50 shadow-sm w-20 h-20 justify-center">
                        <FontAwesome name="github" size={32} color="black" />
                      </TouchableOpacity>
                  </View>

                  <View className="flex-row justify-center mt-8 mb-8">
                    <Text className="text-gray-500 font-medium">Already have an account? </Text>
                    <Link href="/auth/login">
                      <Text className="text-blue-600 font-bold">Login Now</Text>
                    </Link>
                  </View>

              </Animated.View>
              </View>
            </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
    </View>
  );
}