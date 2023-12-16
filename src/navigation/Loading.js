import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Loading = () => {
    const styles=StyleSheet.create({
        view:{
            flex:1,
            justifyContent:"center",
            alignItems:"center"
        },
        text:{
            fontSize:30,
            textAlign:"center",
            borderBottomWidth:4,
            borderBottomColor:"#ddd"
        }
    })
    return (
    <View style={styles.view}>
        <Text style={styles.text}>
            Wait a moment till we set your data
        </Text>
    </View>
    )
}

export default Loading