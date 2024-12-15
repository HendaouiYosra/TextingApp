import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useUser } from '../context/userContext';
import firebase from "../config";
import Home from './Home';
const auth = firebase.auth();

export default function SignIn(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { userId, setUserId } = useUser();

  useEffect(() => {
    console.log("User ID in context:", userId); 
    if (userId) {
      console.log("Navigating to Home with userId:", userId);
      props.navigation.replace("Home");
    }
  }, [userId]);
  const handleSignIn = async () => {
    
    if (!email || !password) {
      Alert.alert("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      // Attempt to sign in with email and password
      auth.signInWithEmailAndPassword(email,password).then(() => {
        const currentId =auth.currentUser?.uid;
        console.log("Current User ID:", currentId);  // Check if the user ID is logged correctly
  if (currentId) {
    console.log("Setting userId:", currentId); 
    setUserId(currentId);
  
    
  } else {
    console.log("No user ID available.");
  }
      })// This will replace the current screen with the Home screen
    } catch (error) {
      console.error(error);
      Alert.alert('Sign In Failed', error.message); // Show an alert if sign-in fails
    } finally {
      setLoading(false);
    }
  };
  const handleSignUpNavigation = () => {

    props.navigation.navigate('SignUp'); // Navigate to SignUp screen
  };

    return (<View style={styles.container}>
        <Text style={styles.title}>Sign In</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        <Button title={loading ? 'Signing In...' : 'Sign In'} onPress={handleSignIn} />
        <Button title="Create Account" onPress={handleSignUpNavigation} />
      </View>
    );
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    input: {
      width: '100%',
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 10,
      paddingHorizontal: 10,
    },
  });