import React from 'react'
import { Text } from 'react-native'
const Subject = ({navigation,route}) => {
  const {subject}=route.params;
  return (
    <Text>{subject}</Text>
  )
}

export default Subject