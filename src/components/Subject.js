import React from 'react'
import { Text } from 'react-native'
const Subject = ({navigation,route}) => {
    const sub=route.params.subject;
    return (
    <Text>Subject</Text>
  )
}

export default Subject