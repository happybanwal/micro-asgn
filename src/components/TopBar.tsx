import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import tw from '../utils/tailwind'; 

interface TopBarProps {
  title: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightComponent?: React.ReactNode;
}

const TopBar: React.FC<TopBarProps> = ({
  title,
  showBackButton = true,
  onBackPress,
  rightComponent
}) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View 
      style={[
        tw`w-full bg-card-bg flex-row items-center px-4`,
        {
          paddingTop: Platform.OS === 'ios' ? insets.top : StatusBar.currentHeight,
          height: (Platform.OS === 'ios' ? insets.top : StatusBar.currentHeight || 0) + 56
        }
      ]}
    >
      <StatusBar 
        backgroundColor={tw.color('bg-card-bg')}
        barStyle="light-content"
      />
      
      {/* Content Container */}
      <View style={tw`flex-row items-center flex-1`}>
        {showBackButton && (
          <TouchableOpacity 
            onPress={handleBackPress}
            style={tw`mr-3 p-2`}
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          >
            <Ionicons 
              name="arrow-back" 
              size={24} 
              color="white" 
            />
          </TouchableOpacity>
        )}
        
        <Text 
          style={tw`text-white text-lg font-bold flex-1`}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
        
        {rightComponent && (
          <View style={tw`ml-auto`}>
            {rightComponent}
          </View>
        )}
      </View>
    </View>
  );
};

export default TopBar;