import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Heading = ({ heading }) => {
    const styles = StyleSheet.create({
        head: {
            paddingHorizontal: 5,
            paddingVertical: 8,
            alignItems: 'center',
            backgroundColor: '#cccccc'
        },
        headText: {
            fontSize: 30,
            textAlign: 'center',
            fontFamily: "Georgia, 'Times New Roman', Times, serif",
        },

    })
    return (
        <View style={styles.head}>
            <Text style={styles.headText}>{heading}</Text>
        </View>
    )
}

export default Heading