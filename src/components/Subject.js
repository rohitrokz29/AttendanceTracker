import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, StatusBar, Pressable } from 'react-native'
import Heading from './Heading';
import Calendar from './calendar/Calendar';
import { useUserContext } from '../context/UserData';


const Subject = ({ navigation, route }) => {
  const { subject } = route.params;
  const [subjectData, setSubjectData] = useState({})
  const [loading, setLoading] = useState(true);
  const {updated}=useUserContext();



  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      let res = await AsyncStorage.getItem(subject);
      res = await JSON.parse(res);
      setSubjectData(res)
      setLoading(false)
    }

    getData();

  }, [updated])

  return (
    <SafeAreaView style={styles.container}>
      <Heading heading={subject} />
      {
        !loading && <Calendar subjectData={subjectData} />
      }
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
  }
})

export default Subject