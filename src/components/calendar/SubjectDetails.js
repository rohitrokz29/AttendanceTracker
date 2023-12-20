import { AntDesign } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Modal } from 'react-native'
import { useUserContext } from '../../context/UserData'

const SubjectDetails = ({ subjectData }) => {
    const [data, Setdata] = useState({
        startDate: new Date(subjectData['startDate']).toDateString(),
        attendance: ((subjectData['1'].length - 1) * 100.0 / (subjectData['1'].length + subjectData['0'].length - 2)).toFixed(2),
        minRequired: subjectData['minRequired']
    })
    const [deleteBox, setDeleteBox] = useState(false)
    const { updated } = useUserContext()
    useEffect(() => {
        Object.assign(data, {
            startDate: new Date(subjectData['startDate']).toDateString(),
            attendance: ((subjectData['1'].length - 1) * 100.0 / (subjectData['1'].length + subjectData['0'].length - 2)).toFixed(2),
            minRequired: subjectData['minRequired']
        })
    }, [subjectData])
    return (
        (data) && <>
            <View style={styles.topContainer} >
                <View style={styles.leftSide}>
                    <Text style={styles.item}>Starting Date: {data.startDate}</Text>
                    <Text style={[styles.item, { color: (data.attendance >= +data.minRequired ? 'green' : 'red') }]}>Attendance: {data.attendance!=='NaN'?data.attendance:'0.00'}%</Text>
                    <Text style={styles.item}>Minimum Attendance: {data.minRequired}%</Text>
                </View>
                <View style={styles.rightSide}>
                    <Pressable
                        onPress={() => setDeleteBox(true)}
                        style={styles.button}
                    >
                        <AntDesign name='delete' size={30} color={'red'} />
                    </Pressable>
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={deleteBox}
            >
                <ConfirmDelete subject={subjectData['subject']} setDeleteBox={setDeleteBox} deleteBox={deleteBox} />
            </Modal>
        </>
    )
}
export default SubjectDetails

const ConfirmDelete = ({ subject, setDeleteBox }) => {
    const { deleteOneSubject } = useUserContext();
    return (
        <View style={styles.modal}>
            <Text style={styles.modalText}>Are you Sure to Delete the Subject '{subject}'?</Text>
            <View style={styles.buttons}>
                <Pressable
                    style={styles.checkButton}
                    onPress={async () => {
                        await deleteOneSubject({ subject });
                        setDeleteBox(deleteBox => !deleteBox);
                    }}
                >
                    <AntDesign name='check' size={25} color={'green'} />
                </Pressable>
                <Pressable
                    style={styles.checkButton}
                    onPress={() => setDeleteBox(deleteBox => !deleteBox)}
                >
                    <AntDesign name='close' size={25} color={'red'} />
                </Pressable>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    topContainer: {
        flex: 1,
        flexDirection: "row",
        paddingHorizontal: 15,
        justifyContent: "space-between"
    },
    leftSide: {
        paddingVertical: 15
    },
    rightSide: {
        minWidth: 100,
        paddingVertical: 15,
        height: "100%"
    },
    item: {
        fontSize: 20,
        marginVertical: 5
    },
    button: {
        height: "100%",
        justifyContent: "center"
    },
    modal: {
        flex: 1,
        marginVertical: 30,
        marginHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: '#000',
        maxHeight: 200,

    },
    modalText: {
        color: '#fff',
        fontSize: 20
    },
    buttons: {
        flexDirection: 'row',
        marginTop: 10
    },
    checkButton: {
        marginHorizontal: 15,
        backgroundColor: '#3a3a3a',
        padding: 10,
        borderColor: '#ddd',
        borderWidth: 3

    }
})