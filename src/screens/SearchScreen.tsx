import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Image,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import tw from '../utils/tailwind';

type SearchScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Search'>;
};

interface GitHubUser {
  id: number;
  login: string;
  avatar_url: string;
  name: string | null;
  bio: string | null;
  followers: number;
  following: number;
  followers_url: string;
  following_url: string;
}

const SearchScreen: React.FC<SearchScreenProps> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  const searchUser = async () => {
    if (!username.trim()) {
      setError('Please enter a GitHub username');
      return;
    }

    setLoading(true);
    setError(null);
    setUser(null);
    setNotFound(false);

    try {
      const response = await fetch(`https://api.github.com/users/${username.trim()}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          setNotFound(true);
        } else {
          setError(`Error: ${response.status} ${response.statusText}`);
        }
        return;
      }
      
      const data = await response.json();
      setUser(data);
      
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
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
    <SafeAreaView style={tw`flex-1 bg-app-bg items-center justify-center p-4`}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      
      <View style={tw`w-full max-w-[350px] bg-card-bg rounded-xl p-5 shadow-lg`}>
        <View style={tw`flex-row items-center mb-5`}>
          <Ionicons name="logo-github" size={24} color="white" />
          <Text style={tw`text-white font-bold text-lg ml-2.5`}>GitHub User Search</Text>
        </View>

        <Text style={tw`text-white text-sm mb-2`}>GitHub Username</Text>
        <TextInput
          style={tw`bg-input-bg rounded-md p-3 text-white mb-6 text-base`}
          placeholder="Enter a GitHub username"
          placeholderTextColor="#666666"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
          onSubmitEditing={searchUser}
        />

        {loading ? (
          <View style={tw`items-center justify-center h-10 mb-5`}>
            <ActivityIndicator size="small" color="#0096FF" />
          </View>
        ) : (
          <TouchableOpacity 
            style={tw`bg-primary-blue rounded-md py-3 items-center justify-center mb-5`} 
            onPress={searchUser}
          >
            <Text style={tw`text-white font-bold text-base`}>Search</Text>
          </TouchableOpacity>
        )}

        {notFound && (
          <Text style={tw`text-gray-400 text-center mt-2.5 text-sm`}>
            No user found with that username. Please try again.
          </Text>
        )}

        {user && (
          <View style={tw`items-center mt-5 border-t border-gray-700 pt-5`}>
            <Image 
              source={{ uri: user.avatar_url }} 
              style={tw`w-24 h-24 rounded-full mb-4`} 
            />
            <Text style={tw`text-white font-bold text-xl`}>{user.name || ""}</Text>
            <Text style={tw`text-gray-400 text-base mb-3`}>@{user.login}</Text>
            
            {user.bio && (
              <Text style={tw`text-gray-300 text-center my-3 leading-5`}>{user.bio}</Text>
            )}
            
            <View style={tw`flex-row mt-4 w-full`}>
              <TouchableOpacity 
                style={tw`flex-1 items-center`} 
                onPress={navigateToFollowers}
              >
                <Text style={tw`text-white font-bold text-lg`}>{user.followers}</Text>
                <Text style={tw`text-gray-400 mt-1`}>followers</Text>
              </TouchableOpacity>
              
              <View style={tw`w-px h-10 bg-gray-700 mx-5`} />
              
              <TouchableOpacity 
                style={tw`flex-1 items-center`} 
                onPress={navigateToFollowing}
              >
                <Text style={tw`text-white font-bold text-lg`}>{user.following}</Text>
                <Text style={tw`text-gray-400 mt-1`}>following</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;