import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SearchScreen from './src/screens/SearchScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ListScreen from './src/screens/ListScreen';
import { StatusBar } from 'expo-status-bar';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <>
    <StatusBar style="light" backgroundColor="#121212" translucent={true} />
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Search'>
        <Stack.Screen 
        name="Search" 
        options={{
          headerShown: false,
        }}
        component={SearchScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="List" component={ListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </>
    
  )
}

