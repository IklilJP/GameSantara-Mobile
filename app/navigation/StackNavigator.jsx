// StackNavigator.jsx
import React from 'react';
import TabNavigator from './TabNavigator';
import DetailsScreen from '../screens/DetailsScreen/DetailsScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditProfileScreen from '../screens/ProfileScreen/EditProfileScreen';

const Stack = createNativeStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomTabs" component={TabNavigator} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
}

export default StackNavigator;
