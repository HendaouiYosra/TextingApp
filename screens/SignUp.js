import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, Image, Alert, TouchableHighlight } from 'react-native';
import { createClient } from '@supabase/supabase-js';
import * as ImagePicker from 'expo-image-picker';
import firebase from "../config";
import { supabase } from '../config';

const database = firebase.database();
export default function SignUp(props) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);
  const [isDefaultImage, setIsDefaultImage] = useState(true);

  const uploadImage = async (uri, userId) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const arraybuffer = await new Response(blob).arrayBuffer();

    console.log(arraybuffer);

    // Use userId instead of currentId
    await supabase.storage
      .from("avatar")
      .upload("image" + userId, arraybuffer);

    const { data } = supabase.storage
      .from("avatar")
      .getPublicUrl("image" + userId);
console.log(data.publicUrl)
    return data.publicUrl;
  };
  

  const pickImage = async () => {
    console.log('Opening image picker...');
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (!permissionResult.granted) {
      alert('Permission to access camera roll is required!');
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    console.log('Picker result: ', result);
    if (result.canceled) {
      console.log('User canceled image picker');
    } else {
      
      setImage(result.assets[0].uri); // Set the URI to state
      console.log('Selected Image URI:', Image);
      console.log(result.assets[0].uri);
      setIsDefaultImage(false);
    }
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
  
    if (!email || !username || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
  
    setLoading(true);
  
    try {
      // Initialize profileImageUrl as null
      let profileImageUrl = null;
  
      // If an image is provided, upload it and get its URL
      if (image) {
        profileImageUrl = await uploadImage(image, username);
      }
  
      // Create a new user with email and password
      const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
  
      // Save user information in Firestore
      const userRef = database.ref("ListProfile");
      const ref_un_user = userRef.child("un_User" + user.uid);
      ref_un_user
        .set({
        id: user.uid,
        name: username,
        email: email,
        profileImageUrl: profileImageUrl, // Directly assign null if no image
      });
  
      // Notify the user of successful sign-up
      Alert.alert('Success', 'Account created successfully');
      
      // Navigate to the Home screen
      props.navigation.navigate('SignIn');
    } catch (error) {
      // Catch any errors during the process and display them
      Alert.alert('Sign Up Error', error.message);
    } finally {
      // Ensure loading state is reset
      setLoading(false);
    }
  };
  
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TouchableOpacity onPress={() => props.navigation.goBack()}>
        <Text>Back</Text>
      </TouchableOpacity>

      <TouchableHighlight onPress={pickImage}>
        <Image
          source={
            isDefaultImage
              ? require("../assets/splash.png")
              : { uri: image }
          }
          style={{
            borderRadius: 100,
            height: 150,
            width: 150,
            marginBottom: 20,
          }}
        />
      </TouchableHighlight>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 8 }}
      />
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 8 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 8 }}
      />
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 8 }}
      />

      <Button title="Sign Up" onPress={handleSignUp} disabled={loading} />
      <Text style={{ textAlign: 'center', marginTop: 20 }}>
        Already have an account?{' '}
        <Text onPress={() => props.navigation.navigate('SignIn')}>Sign In</Text>
      </Text>
    </View>
  );
}
