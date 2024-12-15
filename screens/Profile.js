import React, { useEffect, useState } from 'react'
import { View, TextInput, Button, Text, TouchableOpacity, Image, Alert, TouchableHighlight } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useUser } from '../context/userContext';
import firebase, { supabase } from '../config';

const database = firebase.database();
export default function Profile(props) {
 const { userId } = useUser();
 const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log(userId)
  useEffect(() => {
    // Fetch current user data from the database
    const fetchUserData = async () => {
      try {
        const userRef = database.ref("ListProfile").child("un_User" + userId);
        const snapshot = await userRef.once('value');
        const userData = snapshot.val();
        console.log(userData);
        if (userData) {
          setEmail(userData.email);
          setUsername(userData.name);
          setImage(userData.profileImageUrl);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [userId]);

  const uploadImage = async (uri, userId) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const arrayBuffer = await new Response(blob).arrayBuffer();

      const { error } = await supabase.storage
        .from('avatar')
        .upload(`image${userId}`, arrayBuffer, { contentType: 'image/jpeg' });

      if (error) {
        console.error('Image Upload Error:', error.message);
        throw new Error('Failed to upload image');
      }

      const { data } = await supabase.storage.from('avatar').getPublicUrl(`image${userId}`);
      if (!data?.publicUrl) {
        throw new Error('Failed to retrieve public URL');
      }

      return data.publicUrl;
    } catch (err) {
      console.error('Upload Error:', err.message);
      throw new Error('Image upload failed');
    }
  };

  const pickImage = async () => {
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
  
    if (result.canceled) {
      console.log('User canceled image picker');
    } else {
      setImage(result.assets[0].uri);
      setIsDefaultImage(false);
    }
  };

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      let profileImageUrl = image;
      if (image && !isDefaultImage) {
        profileImageUrl = await uploadImage(image, userId);
      }

      const userRef = database.ref("ListProfile").child("un_User" + userId);
      await userRef.update({
        name: username,
        email: email,
        profileImageUrl: profileImageUrl || null,
      });

      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile: ' + error.message);
    } finally {
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
          source={ image }
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
      
      <Button title="Update Profile" onPress={handleUpdateProfile} disabled={loading} />
    </View>
  )
}