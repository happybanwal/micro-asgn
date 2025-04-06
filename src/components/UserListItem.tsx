import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import tw from '../utils/tailwind';

interface UserListItemProps {
  avatar: string;
  name: string;
  username: string;
  onPress: () => void;
}

const UserListItem: React.FC<UserListItemProps> = ({ 
  avatar, 
  name, 
  username, 
  onPress 
}) => {
  return (
    <TouchableOpacity
      style={tw`flex-row items-center py-3 px-4`}
      onPress={onPress}
    >
      <Image 
        source={{ uri: avatar }} 
        style={tw`w-10 h-10 rounded-full mr-3`}
        defaultSource={require('../../assets/default-avatar.png')} 
      />
      <View style={tw`flex-1`}>
        <Text style={tw`text-white font-medium text-base`}>{name}</Text>
        <Text style={tw`text-gray-400 text-sm`}>@{username}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default UserListItem;