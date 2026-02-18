import { View, Pressable, Text, TextInput } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Forgot() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-gray-50 p-5">
      <View className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-lg">
        <Text className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Forgot Password{"\n"}No worries
        </Text>
        <Text className="text-lg font-semibold text-gray-700 mb-2 px-1">
           Email
        </Text>
        <TextInput
          keyboardType="email-address"
          placeholder="Enter Your Email"
          className="w-full h-12 border border-gray-300 rounded-xl px-4 mb-6 bg-gray-50"
        />
        <Pressable 
          className="w-full h-14 bg-blue-600 rounded-xl items-center justify-center active:bg-blue-700 shadow-md"
          onPress={() => console.log('Forgot Passwrod Pressed')}
        >
          <Text className="text-white text-lg font-semibold">Verify OTP</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}