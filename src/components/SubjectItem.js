import React from "react";
import { View,StyleSheet,Text } from "react-native";

const SubjectItem = ({ subject, percentage, minRequired }) => {
    const styles = StyleSheet.create({
      item: {
        backgroundColor:(percentage>minRequired)?'#6af46a':'#e86d6d',
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginVertical: 5,
        marginHorizontal:"10%",
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderColor:'#fff',
        borderWidth:3,
        borderRadius:10
      },
      subject: {
        textAlign: 'left',
        width:"60%",
        fontSize:16
      },
      percentage: {
        textAlign:'left',
        width:"20%"
      }
    })
    return (
      <View style={styles.item} >
        <Text style={styles.subject}>{subject}</Text>
        <Text style={styles.percentage}>{percentage}%</Text>
      </View>
    )
  }
  export default SubjectItem