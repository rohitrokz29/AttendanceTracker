import React from 'react'
import { FlatList, SafeAreaView, Text, View, StyleSheet } from 'react-native'
import { useUserContext } from '../context/UserData'
import { StatusBar } from 'expo-status-bar';
import SubjectItem from './SubjectItem';
import NoItem from './NoItem';
import Heading from './Heading';

const UserProfile = () => {
  const { user, subjectList } = useUserContext();

  const styles = StyleSheet.create({
    container: {
      marginTop: StatusBar.CurrentHeight || 0
    },
    detailContainer: {
      flex: 1,
      marginHorizontal: 15,
      paddingHorizontal: 5,
      borderBottomWidth: 4,
      borderBlockColor: '#000',
      paddingVertical: 5
    },
    specificDetailView: {
      paddingVertical: 5
    },
    detailHeading: {
      fontSize: 18,
      fontWeight: 'bold',
      color: "#d0411a",
      fontFamily: "Georgia, 'Times New Roman', Times, serif",
    },
    detail: {
      paddingHorizontal: 10,
      fontSize: 16,
      fontFamily: "Georgia"
    },
    subjectList: {
      paddingVertical: 5,
      paddingHorizontal: 15
    },
    subjectHeading: {
      fontSize: 15,
      fontFamily: "Georgia, 'Times New Roman', Times, serif",
      fontWeight: "bold",
      textAlign: "center",
      lineHeight: 20,
      paddingVertical: 15
    }
  })

  return (
    <SafeAreaView style={styles.container}>
      <Heading heading={'Profile'}/>
      <View style={styles.detailContainer}>
        <View style={styles.specificDetailView}>
          <Text style={styles.detailHeading}>Name</Text>
          <Text style={styles.detail}>{user['name']}</Text>
        </View>

        <View style={styles.specificDetailView}>
          <Text style={styles.detailHeading}>Age</Text>
          <Text style={styles.detail}>{user['age']}</Text>
        </View>

        <View style={styles.specificDetailView}>
          <Text style={styles.detailHeading}>Gender</Text>
          <Text style={styles.detail}>{user['gender']}</Text>
        </View>

        <View style={styles.specificDetailView}>
          <Text style={styles.detailHeading}>School/College</Text>
          <Text style={styles.detail}>{user['school']}</Text>
        </View>

      </View>
      <Text style={styles.subjectHeading}>Your Attendance Summary</Text>

      <View style={styles.subjectList}>
        <FlatList
          data={subjectList}
          keyExtractor={(item)=>item.subject}
          ListEmptyComponent={<NoItem message="You Have No Subjects To Track"/>}
          renderItem={({ item }) => {
            let currentAbsent = item['currentAbsent']
            let currentPresent = item['currentPresent']
            const percentage = ((currentPresent * 100.0 / (currentAbsent + currentPresent)).toFixed(2));
            return <SubjectItem
              subject={item['subject']}
              percentage={percentage}
              minRequired={item['minRequired']}
            />
          }}
        />
      </View>
    </SafeAreaView>
  )
}
export default UserProfile