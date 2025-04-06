import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from '../utils/tailwind'; // Make sure to adjust the path to your tailwind.js file

const SearchScreen = () => {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = async () => {
    if (!username.trim()) {
      setError('Please enter a GitHub username');
      return;
    }

    setIsLoading(true);
    setError('');
    setSearchPerformed(true);
    
    try {
      // Simulate API call to GitHub
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, always show not found error
      setError('No user found with that username. Please try again.');
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-900`}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={tw`flex-1 justify-center items-center p-5`}
      >
        <View style={tw`w-full max-w-md bg-gray-800 rounded-xl p-5 shadow-lg`}>
          <View style={tw`flex-row items-center mb-5`}>
            <Ionicons name="logo-github" size={24} color="white" />
            <Text style={tw`text-white font-bold text-lg ml-2`}>GitHub User Search</Text>
          </View>
          
          <View style={tw`mb-6`}>
            <Text style={tw`text-white text-sm mb-2`}>GitHub Username</Text>
            <TextInput
              style={tw`bg-gray-700 rounded-md px-3 py-3 text-white`}
              placeholder="Enter a GitHub username"
              placeholderTextColor="#999"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          
          {isLoading ? (
            <View style={tw`py-5 items-center`}>
              <ActivityIndicator size="large" color="#0096FF" />
            </View>
          ) : (
            <>
              <TouchableOpacity 
                style={tw`bg-blue-500 rounded-md py-3.5 items-center justify-center`} 
                onPress={handleSearch}
                activeOpacity={0.8}
              >
                <Text style={tw`text-white font-bold text-base`}>Search</Text>
              </TouchableOpacity>
              
              {searchPerformed && error ? (
                <Text style={tw`text-gray-400 text-center mt-4 text-sm`}>{error}</Text>
              ) : null}
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SearchScreen;