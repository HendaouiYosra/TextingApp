import React from 'react';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Users from './Users';
import Groups from './Groups';
import Profile from './Profile';
import { UserProvider } from '../context/userContext';

const Tab = createMaterialBottomTabNavigator();

export default function Home() {

  const handleLogout = () => {
    console.log('Logout pressed');
    // Add logout logic here
  };

  return ( 
    <Tab.Navigator
      barStyle={styles.tabBar}
      screenOptions={{
        tabBarLabelStyle: styles.tabLabel,
        tabBarIconStyle: styles.tabIcon,
      }}
    >


      <Tab.Screen
        name="ListProfile"
        component={Users}
        
        options={{
          tabBarLabel: 'Users',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../assets/users-icon.png')}
              style={[styles.icon]}
            />
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
              <Image source={require('../assets/out.png')} style={styles.logoutIcon} />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Groupe"
        component={Groups}
        
        options={{
          tabBarLabel: 'Groups',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../assets/groups-icon.png')}
              style={[styles.icon]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MyProfile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../assets/profile-icon.png')}
              style={[styles.icon]}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  
  tabLabel: {
    fontSize: 14, // Adjust font size of tab labels
  },
  icon: {
    width: 24,
    height: 24,
  },
  logoutButton: {
    marginLeft: 10, // Add spacing for the logout button
  },
  logoutIcon: {
    width: 24,
    height: 24,
  },
});
