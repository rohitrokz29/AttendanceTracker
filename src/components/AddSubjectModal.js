import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { DatePickerInput } from "react-native-paper-dates"
import { useUserContext } from '../context/UserData'

const AddSubjectModal = ({ setModalVisible, modalVisible }) => {
    const [subject, setSubject] = useState({ subject: "", startDate: new Date(), minRequired: "", })
    const [error, setError] = useState("")
    const { addSubject } = useUserContext();

    const handleSubmit = async () => {
        try {
            let res = await addSubject(subject);
            if (res) {
                setSubject({ subject: "", startDate: new Date(), minRequired: "" })
                setError("");
                setModalVisible(!modalVisible)
                return;
            }
            setError("Invalid Data")
        } catch (error) {
            setError(error.message)
        }
    }
    const styles = StyleSheet.create({
        centeredView: {
            backgroundColor: "#343434",
            marginVertical: 50,
            marginHorizontal: 10,
            padding: 10,
            minHeight: 450
        },
        modalView: {
            flexDirection: 'row',
            justifyContent: "space-between",
            marginVertical: 5
        },
        modalText: {
            fontSize: 20,
            color: "#fff",
            textAlign: 'center',
        },
        close: {
            verticalAlign: 'middle'
        },
        modalCross: {
            color: "#fff",
            fontSize: 25,
            alignItems: "right",
        },
        modalForm: {
            paddingLeft: 15,
            flex: 1,
        },
        inputView: {
            paddingVertical: 10
        },
        inputText: {
            fontSize: 15,
            color: "#fff",
        },
        inputBox: {
            backgroundColor: "#fff",
            lineHeight: 25,
            paddingHorizontal: 10,
            maxWidth: 250,
            marginLeft: 10,
            marginTop: 5,
            paddingVertical: 8,
            borderColor: "#ffaaaa",
            borderWidth: 3,
            borderRadius: 10,
            fontSize: 15
        },
        button: {
            flexDirection: "row",
            justifyContent: 'center'
        },
        buttonText: {
            marginVertical: 10,
            fontSize: 15,
            fontWeight: "bold",
            color: "#000",
            textAlign: 'center',
            backgroundColor: "lightgreen",
            paddingVertical: 10,
            paddingHorizontal: 40,
            maxWidth: 150
        },
        error: {
            display: error ? "flex" : "none",
            lineHeight: 15,
            backgroundColor: "#a20000b8",
            paddingVertical: 10,
            paddingHorizontal: 30,
            marginHorizontal: "auto",
            minWidth: 250,
            color: "#fff",
            fontSize: 15,
            textAlign: "center",
            marginVertical: 10
        }

    })
    return (
        <>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Add New Subject</Text>
                    <Pressable
                        style={styles.close}
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                        <Entypo style={styles.modalCross} name='cross' />
                    </Pressable>
                </View>
                <View style={styles.modalForm}>
                    <View style={styles.inputView}>
                        <Text style={styles.inputText}>Subject Name:</Text>
                        <TextInput
                            style={styles.inputBox}
                            placeholder="Enter Subject Name"
                            placeholderTextColor="grey"
                            onChangeText={sub => setSubject({ ...subject, 'subject': sub })}
                            value={subject['subject']}
                        />
                    </View>

                    <View style={styles.inputView}>
                        <Text style={styles.inputText}>Start Date:</Text>
                        <DatePickerInput
                            style={styles.inputBox}
                            locale="en"
                            label="Start Date"
                            value={subject['startDate']}
                            onChange={(startDate) => setSubject({ ...subject, startDate })}
                            inputMode="start"
                        />
                    </View>
                    <View style={styles.inputView}>
                        <Text style={styles.inputText}>Minimum Required Attendance (in%):</Text>
                        <TextInput
                            style={styles.inputBox}
                            keyboardType='numeric'
                            placeholder="Enter Minimum Required Attendance"
                            placeholderTextColor="grey"
                            onChangeText={minRequired => setSubject({ ...subject, minRequired })}
                            value={subject['minRequired']}
                        />
                    </View>
                    <Pressable
                        style={styles.button}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.buttonText}>
                            Submit
                        </Text>
                    </Pressable>

                    <View>
                        <Text style={styles.error}>{error}</Text>
                    </View>


                </View>
            </View>
        </>
    )
}

export default AddSubjectModal