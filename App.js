import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Groups from './screens/Groups';
import { UserProvider } from './context/userContext';
import Users from './screens/Users';
const Stack = createNativeStackNavigator();


export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Hide splash after 3 seconds
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <View style={styles.splashContainer}>
        <Image source={require('./assets/splash.png')} style={styles.splashImage} />
        <Text> Textini </Text>
        
      </View>
    );
  }
  return (
    <UserProvider> 
    <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name='SignIn' component={SignIn}></Stack.Screen>
              <Stack.Screen name='SignUp' component={SignUp}></Stack.Screen>
              <Stack.Screen name='Home' component={Home}></Stack.Screen>
              <Stack.Screen name='Profile' component={Profile}></Stack.Screen>
              <Stack.Screen name='Groups' component={Groups}></Stack.Screen>
              <Stack.Screen name='Users' component={Users}></Stack.Screen>
            </Stack.Navigator>
            
    </NavigationContainer>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  splashImage: {
    width: 200,
    height: 200,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
