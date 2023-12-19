import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { useUserContext } from "../context/UserData";

const SubjectItem = ({ subject, navigation}) => {
  const [percentage,setPercentage]=useState(-1);
  const [isGood,setIsGood]=useState(false);
  const {updated}=useUserContext();
  useEffect(()=>{
    try {
      const getData=async ()=>{
        let data=await JSON.parse(await AsyncStorage.getItem(subject));
        let absent=data['0'].length-1;
        let present=data['1'].length-1;
        let percentage=((present*100.0)/(present+absent)).toFixed(2);
        setIsGood(+percentage>=+data['minRequired']);
        setPercentage(percentage);
      }
      getData();

    } catch (error) {
      
    }
  },[updated])
  return (
    (percentage!==-1)&&<Pressable
      key={subject}
      onPress={() => navigation.navigate('Subject', { subject })}    >
      <View style={[styles.item,
      {
        backgroundColor: (isGood) ? '#3ef53e' : '#f76d6d',
      }]} >
        <Text style={styles.subject}>{subject}</Text>
        <Text style={styles.percentage}>{percentage==='NaN'?'00.00':percentage}%</Text>
      </View>
    </Pressable>
  )
}
export default SubjectItem

const styles = StyleSheet.create({

  item: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical: 5,
    marginHorizontal: "10%",
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderColor: '#fff',
    borderWidth: 3,
    borderRadius: 10
  },
  subject: {
    textAlign: 'left',
    width: "60%",
    fontSize: 16
  },
  percentage: {
    textAlign: 'left',
    width: "20%"
  }
})

