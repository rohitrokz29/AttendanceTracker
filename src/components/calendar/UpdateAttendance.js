import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useUserContext } from '../../context/UserData'


const UpdateAttendance = ({ date, subject, setModalVisible }) => {
    const { SetUpdated } = useUserContext();
    const updateAttendance = async ({ date, subject, status }) => {
        try {
            let subjectData = await JSON.parse(await AsyncStorage.getItem(subject));
            date = (new Date(date)).toDateString();
            if (status !== 0 && subjectData['0'].includes(date)) {
                subjectData['0'] = subjectData['0'].filter(item => item !== date);
            }
            if (status !== 1 && subjectData['1'].includes(date)) {
                subjectData['1'] = subjectData['1'].filter(item => item !== date);
            }
            if (status !== -1 && subjectData['-1'].includes(date)) {
                subjectData['-1'] = subjectData['-1'].filter(item => item !== date);
            }
            if (!subjectData[status].includes(date)) {
                subjectData[status].unshift(date);
            }
            subjectData['currentLastDate']=date;
            Object.assign(subjectData)
            await AsyncStorage.setItem(subject, JSON.stringify(subjectData));
            SetUpdated(update => !update)

        } catch (error) {
            return null;
        }
    }

    const setAttendance = async (status) => {
        await updateAttendance({ subject, status, date: (new Date(date).toDateString()) });
        setModalVisible(false);
    }
    return (
        <>
            <View style={styles.modalBox}>
                <View style={styles.headBox}>
                    <Text style={styles.heading}>Set Attendance on  {(new Date(date)).toLocaleDateString()}</Text>
                    <Pressable
                        style={styles.close}
                        onPress={() => setModalVisible(modalVisible => !modalVisible)}
                    >
                        <Entypo style={styles.modalCross} name='cross' />
                    </Pressable>
                </View>

                <View style={styles.options}>
                    <Pressable
                        key='absent'
                        style={[styles.button, { backgroundColor: "red" }]}
                        onPress={() => setAttendance(0)}
                    >
                        <Text>Absent</Text>
                    </Pressable>
                    <Pressable
                        key='present'
                        style={[styles.button, { backgroundColor: "green" }]}
                        onPress={() => setAttendance(1)}
                    >
                        <Text>Present</Text>
                    </Pressable>
                    <Pressable
                        key='noclass'
                        style={[styles.button, { backgroundColor: "#ddd" }]}
                        onPress={() => setAttendance(-1)}
                    >
                        <Text>No Class</Text>
                    </Pressable>
                </View>
            </View>
        </>
    )
}

export default UpdateAttendance

const styles = StyleSheet.create({
    modalBox: {
        backgroundColor: "#000",
        alignItems: "center",
        marginHorizontal: 15,
        marginVertical: 50,
        paddingVertical: 15
    },
    headBox: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    heading: {
        color: "#fff",
        fontSize: 20,
        textAlign: "center"
    },
    close: {
        textAlign: "right",
        justifyContent: "flex-end"
    },
    modalCross: {
        color: "#fff",
        fontSize: 25,
        alignSelf: "flex-end",
        marginLeft: 30
    },
    options: {
        marginVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    button: {
        paddingHorizontal: 15,
        paddingVertical: 7.5,
        marginHorizontal: 10
    }

})