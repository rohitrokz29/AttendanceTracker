import React from 'react'
import { StyleSheet,View,Text } from 'react-native'

const NoItem = ({message}) => {
  const styles=StyleSheet.create({
    view:{
        backgroundColor:"#fff",
        margin:15,
        padding:10,
    },
    message:{
        textAlign:'center',
        fontSize:40,
        padding:5,
        color:"#565454",
        borderWidth:3,
        borderColor:"#000",
        borderRadius:10
    }
  })
    return (
    <View  style={styles.view}>
        <Text style={styles.message}>{message}</Text>
    </View>
    )
}

export default NoItem