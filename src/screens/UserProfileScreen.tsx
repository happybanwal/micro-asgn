import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { Ionicons } from '@expo/vector-icons';
import tw from '../utils/tailwind';
import TopBar from '../components/TopBar';

type UserProfileScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'UserProfile'>;
  route: RouteProp<RootStackParamList, 'UserProfile'>;
};

interface GitHubUser {
  id: number;
  login: string;
  avatar_url: string;
  name: string | null;
  bio: string | null;
  followers: number;
  following: number;
}

const UserProfileScreen: React.FC<UserProfileScreenProps> = ({ navigation, route }) => {
  const { username } = route.params;
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Hide the default header
    navigation.setOptions({
      headerShown: false
    });
    
    fetchUserData();
  }, [username]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://api.github.com/users/${username}`);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      setUser(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load user data');
      console.error('Error fetching user data:', err);
    } finally {
      setLoading(false);
    }
  };

  const navigateToFollowers = () => {
    if (user) {
      navigation.navigate('Followers', { 
        username: user.login,
        title: `${user.login}'s Followers` 
      });
    }
  };

  const navigateToFollowing = () => {
    if (user) {
      navigation.navigate('Following', { 
        username: user.login,
        title: `${user.login} Following` 
      });
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-card-bg`}>
      <TopBar title={username} />
      
      {loading ? (
        <View style={tw`flex-1 justify-center items-center`}>
          <ActivityIndicator size="large" color="#0096FF" />
        </View>
      ) : error ? (
        <View style={tw`flex-1 justify-center items-center p-4`}>
          <Ionicons name="alert-circle" size={48} color="#e74c3c" />
          <Text style={tw`text-white text-center mt-4`}>{error}</Text>
        </View>
      ) : !user ? (
        <View style={tw`flex-1 justify-center items-center p-4`}>
          <Text style={tw`text-white text-center`}>No user data available</Text>
        </View>
      ) : (
        <ScrollView style={tw`flex-1`} contentContainerStyle={tw`p-4`}>
          <View style={tw`items-center mb-5`}>
            <Image source={{ uri: user.avatar_url }} style={tw`w-30 h-30 rounded-full mb-4`} />
            <Text style={tw`text-white font-bold text-2xl mb-1`}>{user.name || ""}</Text>
            <Text style={tw`text-gray-400 text-base mb-3`}>@{user.login}</Text>
            
            {user.bio && <Text style={tw`text-gray-300 text-center leading-6 px-5`}>{user.bio}</Text>}
          </View>
          
          <View style={tw`flex-row bg-[#1E1E1E] rounded-xl p-4 mb-5`}>
            <TouchableOpacity 
              style={tw`flex-1 items-center py-2.5`} 
              onPress={navigateToFollowers}
              activeOpacity={0.7}
            >
              <Text style={tw`text-white font-bold text-xl`}>{user.followers}</Text>
              <Text style={tw`text-gray-400 mt-1`}>followers</Text>
            </TouchableOpacity>
            
            <View style={tw`w-px bg-gray-700 mx-2.5`} />
            
            <TouchableOpacity 
              style={tw`flex-1 items-center py-2.5`} 
              onPress={navigateToFollowing}
              activeOpacity={0.7}
            >
              <Text style={tw`text-white font-bold text-xl`}>{user.following}</Text>
              <Text style={tw`text-gray-400 mt-1`}>following</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default UserProfileScreen;
