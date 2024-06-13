import { StyleSheet } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the icon set you prefer
import Home from './pages/Home';
import Saved from './pages/Saved';
import CityExpert from './pages/CityExpert';
import Investor from './pages/Investor';
import Profile from './pages/Profile';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'City Expert') {
              iconName = focused ? 'business' : 'business-outline';
            } else if (route.name === 'saved') {
              iconName = focused ? 'heart' : 'heart-outline';
            } else if (route.name === 'Investor') {
              iconName = focused ? 'cash' : 'cash-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { display: 'flex' },
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="City Expert" component={CityExpert} />
        <Tab.Screen name="saved" component={Saved} />
        <Tab.Screen name="Investor" component={Investor} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({});
