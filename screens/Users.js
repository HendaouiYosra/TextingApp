import React from 'react'
import { Text, View } from 'react-native'
import { useUser } from '../context/userContext';

export default function Users(props) {
  const { userId } = useUser(); 
  console.log(userId)
  return (
    <View>  
      <Text>list of users</Text>
    </View>
  )
}
