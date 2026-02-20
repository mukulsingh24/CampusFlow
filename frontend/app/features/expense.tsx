import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Modal, Platform, KeyboardAvoidingView, Dimensions } from 'react-native';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInRight, Layout } from 'react-native-reanimated';
import Svg, { Circle, G, Text as SvgText } from 'react-native-svg';

const { width } = Dimensions.get('window');
const RADIUS = 70;
const STROKE_WIDTH = 20;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

interface Category {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
}

const CATEGORIES: Category[] = [
  { id: '1', name: 'Food & Dining', icon: 'fast-food', color: '#FF6B6B' },
  { id: '2', name: 'Transport', icon: 'bus', color: '#4ECDC4' },
  { id: '3', name: 'Books & Supplies', icon: 'book', color: '#45B7D1' },
  { id: '4', name: 'Entertainment', icon: 'game-controller', color: '#96CEB4' },
  { id: '5', name: 'Personal Care', icon: 'medkit', color: '#FFEEAD' },
];

const INITIAL_EXPENSES: Expense[] = [
  { id: '101', title: 'Lunch at Canteen', amount: 150, category: 'Food & Dining', date: new Date().toISOString() },
  { id: '102', title: 'Bus Fare', amount: 40, category: 'Transport', date: new Date(Date.now() - 86400000).toISOString() },
  { id: '103', title: 'Calculus Textbook', amount: 650, category: 'Books & Supplies', date: new Date(Date.now() - 172800000).toISOString() },
];

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState<Expense[]>(INITIAL_EXPENSES);
  const [modalVisible, setModalVisible] = useState(false);
  
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>(CATEGORIES[0]);

  const totalSpent = useMemo(() => expenses.reduce((acc, curr) => acc + Number(curr.amount), 0), [expenses]);
  
  const categoryBreakdown = useMemo(() => {
    const breakdown: Record<string, number> = {};
    expenses.forEach(item => {
      breakdown[item.category] = (breakdown[item.category] || 0) + Number(item.amount);
    });
    return Object.keys(breakdown).map(cat => ({
      name: cat,
      amount: breakdown[cat],
      percentage: (breakdown[cat] / totalSpent) * 100,
      color: CATEGORIES.find(c => c.name === cat)?.color || '#ccc',
      icon: CATEGORIES.find(c => c.name === cat)?.icon || 'ellipse',
    })).sort((a, b) => b.amount - a.amount);
  }, [expenses, totalSpent]);

  const handleAddExpense = () => {
    if (!title || !amount) return;
    
    const newExpense: Expense = {
      id: Date.now().toString(),
      title,
      amount: parseFloat(amount),
      category: selectedCategory.name,
      date: new Date().toISOString(),
    };

    setExpenses([newExpense, ...expenses]);
    setTitle('');
    setAmount('');
    setModalVisible(false);
  };

  const renderHeader = () => (
    <View className="mb-6">
      <Text className="text-gray-500 text-sm font-medium">Total Balance</Text>
      <View className="flex-row items-baseline">
        <Text className="text-4xl font-bold text-gray-900">₹{totalSpent.toLocaleString()}</Text>
        <Text className="text-gray-500 ml-2 text-sm">spent this month</Text>
      </View>
      
      <View className="flex-row mt-6 justify-between">
        <View className="bg-green-50 p-4 rounded-2xl flex-1 mr-2 items-center">
            <Ionicons name="arrow-down-circle" size={24} color="#10B981" />
            <Text className="text-green-700 font-bold mt-1">Income</Text>
            <Text className="text-gray-700 text-lg font-semibold">₹50,000</Text>
        </View>
        <View className="bg-red-50 p-4 rounded-2xl flex-1 ml-2 items-center">
            <Ionicons name="arrow-up-circle" size={24} color="#EF4444" />
            <Text className="text-red-700 font-bold mt-1">Expense</Text>
            <Text className="text-gray-700 text-lg font-semibold">₹{totalSpent}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50">
      <Stack.Screen options={{ 
        headerTitle: "My Expenses", 
        headerShadowVisible: false, 
        headerStyle: { backgroundColor: '#F9FAFB' },
        headerRight: () => (
            <TouchableOpacity onPress={() => setModalVisible(true)} className="mr-2">
                <Ionicons name="add-circle" size={32} color="#4F46E5" />
            </TouchableOpacity>
        )
      }} />

      <ScrollView className="flex-1 px-5 pt-20" showsVerticalScrollIndicator={false}>
        {renderHeader()}
        
        <Animated.View entering={FadeInDown.delay(200)} className="bg-white p-6 rounded-3xl shadow-lg mb-8 border border-gray-100 items-center relative">
          <Text className="text-xl font-bold text-gray-800 self-start mb-6">Transaction Summary</Text>
          
          <View className="flex-row items-center justify-between w-full">
            {/* Chart */}
            <View className="items-center justify-center mr-4">
              <Svg width={180} height={180} viewBox="0 0 180 180">
                <G rotation="-90" origin="90, 90">
                  {/* Background Circle */}
                  <Circle
                    cx="90"
                    cy="90"
                    r={RADIUS}
                    stroke="#F3F4F6"
                    strokeWidth={STROKE_WIDTH}
                    fill="transparent"
                  />
                  <Circle
                    cx="90"
                    cy="90"
                    r={RADIUS}
                    stroke="#EF4444"
                    strokeWidth={STROKE_WIDTH}
                    fill="transparent"
                    strokeDasharray={CIRCUMFERENCE}
                    // Calculate strokeDashoffset based on expense ratio (e.g. 70% expense)
                    strokeDashoffset={CIRCUMFERENCE * (1 - 0.7)} 
                    strokeLinecap="round"
                  />
                  <Circle
                    cx="90"
                    cy="90"
                    r={RADIUS}
                    stroke="#10B981"
                    strokeWidth={STROKE_WIDTH}
                    fill="transparent"
                    strokeDasharray={CIRCUMFERENCE}
                    strokeDashoffset={CIRCUMFERENCE * (1 - 0.25)} 
                    rotation={360 * 0.7} // Rotate to start after the red part
                    origin="90, 90"
                    strokeLinecap="round"
                  />
                </G>
              </Svg>
              <View className="absolute items-center justify-center">
                 <Text className="text-[10px] text-gray-400 font-medium">Avg Spend Daily</Text>
                 <Text className="text-xl font-bold text-gray-800">₹{Math.round(totalSpent / 30)}</Text>
              </View>
            </View>

            <View className="flex-1 justify-center space-y-4">
               <View className="flex-row items-center mb-3">
                  <View className="w-3 h-3 rounded-full bg-green-500 mr-2" />
                  <View>
                    <Text className="text-gray-500 text-xs">Income</Text>
                    <Text className="text-gray-800 font-bold text-base">₹50,000</Text>
                  </View>
               </View>
               <View className="flex-row items-center">
                  <View className="w-3 h-3 rounded-full bg-red-500 mr-2" />
                  <View>
                    <Text className="text-gray-500 text-xs">Expense</Text>
                    <Text className="text-gray-800 font-bold text-base">₹{totalSpent}</Text>
                  </View>
               </View>
            </View>
          </View>
          
          <Text className="text-gray-400 text-xs mt-6 text-center w-full">
            You have spent {((totalSpent / 50000) * 100).toFixed(1)}% of your budget.
          </Text>
        </Animated.View>

        <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold text-gray-800">Recent Transactions</Text>
            <TouchableOpacity><Text className="text-indigo-600 text-sm font-medium">See All</Text></TouchableOpacity>
        </View>

        {expenses.map((item, index) => (
            <Animated.View 
                key={item.id} 
                entering={FadeInDown.delay(300 + (index * 100))} 
                layout={Layout.springify()}
                className="bg-white p-4 rounded-2xl mb-3 flex-row items-center border border-gray-100 shadow-sm"
            >
                <View className={`w-12 h-12 rounded-full items-center justify-center mr-4 bg-gray-100`}>
                    <Ionicons 
                        name={CATEGORIES.find(c => c.name === item.category)?.icon || 'cash'} 
                        size={24} 
                        color={CATEGORIES.find(c => c.name === item.category)?.color || '#666'} 
                    />
                </View>
                <View className="flex-1">
                    <Text className="text-gray-900 font-bold text-base">{item.title}</Text>
                    <Text className="text-gray-500 text-xs">{item.category} • {new Date(item.date).toLocaleDateString()}</Text>
                </View>
                <Text className="text-red-500 font-bold text-base">- ₹{item.amount}</Text>
            </Animated.View>
        ))}
        <View className="h-24" /> 
      </ScrollView>

      <Animated.View entering={FadeInRight} className="absolute bottom-6 right-6">
        <TouchableOpacity 
            onPress={() => setModalVisible(true)}
            className="bg-indigo-600 w-14 h-14 rounded-full items-center justify-center shadow-lg shadow-indigo-300"
        >
            <Ionicons name="add" size={32} color="white" />
        </TouchableOpacity>
      </Animated.View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1 justify-end">
            <View className="bg-white rounded-t-3xl p-6 shadow-2xl h-[70%]">
                <View className="flex-row justify-between items-center mb-6">
                    <Text className="text-2xl font-bold text-gray-900">Add New Expense</Text>
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                        <Ionicons name="close-circle" size={28} color="#9CA3AF" />
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text className="text-gray-500 font-medium mb-2">Expense Title</Text>
                    <TextInput
                        className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4 text-base text-gray-800"
                        placeholder="e.g. Starbucks, Uber"
                        value={title}
                        onChangeText={setTitle}
                    />

                    <Text className="text-gray-500 font-medium mb-2">Amount (₹)</Text>
                    <TextInput
                        className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4 text-base text-gray-800"
                        placeholder="0.00"
                        keyboardType="numeric"
                        value={amount}
                        onChangeText={setAmount}
                    />

                    <Text className="text-gray-500 font-medium mb-2">Category</Text>
                    <View className="flex-row flex-wrap gap-2 mb-8">
                        {CATEGORIES.map((cat) => (
                            <TouchableOpacity
                                key={cat.id}
                                onPress={() => setSelectedCategory(cat)}
                                style={{ backgroundColor: selectedCategory.id === cat.id ? cat.color : '#F3F4F6' }}
                                className={`px-4 py-2 rounded-full border ${selectedCategory.id === cat.id ? 'border-transparent' : 'border-gray-200'}`}
                            >
                                <Text 
                                    style={{ color: selectedCategory.id === cat.id ? '#FFF' : '#374151' }}
                                    className="font-medium text-sm"
                                >
                                    {cat.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <TouchableOpacity 
                        onPress={handleAddExpense}
                        className="bg-indigo-600 p-4 rounded-xl items-center shadow-lg shadow-indigo-200"
                    >
                        <Text className="text-white font-bold text-lg">Add Expense</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}
