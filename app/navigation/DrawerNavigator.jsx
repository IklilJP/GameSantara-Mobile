import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import TabNavigator from './TabNavigator';
import { color } from '@rneui/base';
import Ionicons from "@expo/vector-icons/Ionicons";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator screenOptions={{
            headerShown: false, drawerStyle:{backgroundColor: "#1d232a", width: '70%'}, drawerItemStyle:{backgroundColor:'#dc2626'}, drawerLabelStyle:{color: 'white'}}}>
            <Drawer.Screen name="Home" component={TabNavigator} options={{drawerIcon: ()=>(<Ionicons name="home" size={24} color="white" />)}}/>
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({})

export default DrawerNavigator;
