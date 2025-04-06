import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { Ionicons } from '@expo/vector-icons';
import tw from '../utils/tailwind';
import UserListItem from '../components/UserListItem';
import TopBar from '../components/TopBar';

type FollowersScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Followers'>;
  route: RouteProp<RootStackParamList, 'Followers'>;
};

interface GitHubUser {
  id: number;
  login: string;
  avatar_url: string;
  name?: string;
  type: string;
}

const FollowersScreen: React.FC<FollowersScreenProps> = ({ navigation, route }) => {
  const { username, title } = route.params;
  const [followers, setFollowers] = useState<GitHubUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
   
    fetchFollowers();
  }, [username]);

  const fetchFollowers = async (isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true);
      setError(null);
      
      const response = await fetch(`https://api.github.com/users/${username}/followers`);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      
      const enhancedData = data.map((user: GitHubUser) => ({
        ...user,
        name: user.login 
      }));
      
      setFollowers(enhancedData);
    } catch (err: any) {
      setError(err.message || 'Failed to load followers');
      console.error('Error fetching followers:', err);
    } finally {
      if (!isRefresh) setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchFollowers(true);
  }, [username]);

  const navigateToUserProfile = (username: string) => {
    navigation.push('UserProfile', { username });
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-card-bg`}>
      <TopBar title={title || "Followers"} />
      
      {loading ? (
        <View style={tw`flex-1 justify-center items-center`}>
          <ActivityIndicator size="large" color="#0096FF" />
        </View>
      ) : error ? (
        <View style={tw`flex-1 justify-center items-center p-4`}>
          <Ionicons name="alert-circle" size={48} color="#e74c3c" />
          <Text style={tw`text-white text-center mt-4`}>{error}</Text>
        </View>
      ) : followers.length === 0 ? (
        <View style={tw`flex-1 justify-center items-center p-4`}>
          <Ionicons name="people-outline" size={48} color="#aaa" />
          <Text style={tw`text-white text-lg mt-4`}>No followers yet</Text>
        </View>
      ) : (
        <FlatList
          data={followers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <UserListItem
              avatar={item.avatar_url}
              name={item.name || item.login}
              username={item.login}
              onPress={() => navigateToUserProfile(item.login)}
            />
          )}
          contentContainerStyle={tw`py-2`}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#0096FF']} 
              tintColor={'#0096FF'}
              title="Pull to refresh"
              titleColor={'#0096FF'}
            />
          }
        />
      )}
    </SafeAreaView>
  );
};

export default FollowersScreen;