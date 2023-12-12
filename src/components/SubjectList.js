import React from 'react'
import { Pressable, SafeAreaView, Text, View, StyleSheet, FlatList } from 'react-native'
import Heading from './Heading'
import { useUserContext } from '../context/UserData'
import SubjectItem from './SubjectItem'
import { StatusBar } from 'expo-status-bar'
import NoItem from './NoItem'

const SubjectList = () => {
    const { subjectList } = useUserContext();

    const styles = StyleSheet.create({
        container: {
            marginTop: StatusBar.CurrentHeight || 0
        },
        addButtonView: {
            marginHorizontal: "10%",
            marginVertical: 10,
            borderWidth: 3,
            borderColor: "#000",
            borderRadius: 10,
            paddingHorizontal: 5,
            paddingVertical: 10,
            backgroundColor: "#d9d9d9"

        },
        buttonText: {
            fontSize: 20,
            textAlign: "center"
        }
    })
    return (
        <SafeAreaView style={styles.container}>
            <Heading heading={"Subject List"} />

            {
                <FlatList
                    data={subjectList}
                    ListEmptyComponent={<NoItem message={"NO Subjects to Show "} />}
                    renderItem={({ item }) => {
                        let currentAbsent = item['currentAbsent']
                        let currentPresent = item['currentPresent']
                        const percentage = ((currentPresent * 100.0 / (currentAbsent + currentPresent)).toFixed(2));

                        return (
                            <Pressable key={item['subject']}>
                                <SubjectItem
                                    subject={item['subject']}
                                    percentage={percentage}
                                    minRequired={item['minRequired']}
                                />
                            </Pressable>
                        )
                    }
                    }
                />
            }
            <Pressable key="add-subject">
                <View style={styles.addButtonView}>
                    <Text style={styles.buttonText}>
                        Add Subject
                    </Text>
                </View>
            </Pressable>
        </SafeAreaView>
    )
}

export default SubjectList

/*
subjectList=[
    {
        subject:"Mathematics",
        currentPresent:45,
        currentAbsent:10,
        minRequired:75.00
    },
    {
        subject:"Science",
        currentPresent:50,
        currentAbsent:5,
        minRequired:75.00
    },
    {
        subject:"Social Science",
        currentPresent:37,
        currentAbsent:18,
        minRequired:75.00
    }
]
*/