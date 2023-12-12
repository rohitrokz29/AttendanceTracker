import { React, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Picker, TextInput, ImageBackground, Pressable } from 'react-native'
import { useUserContext } from '../context/UserData';

const CreateUser = () => {
    const [user, setuser] = useState({ name: "", age: "", gender: '', school: "" });
    const [error, setError] = useState("");
    const {storeUser}=useUserContext();
    const genders = [
        { type: "Male", value: "Male" },
        { type: "Female", value: "Female" },
        { type: "Prefer Not to Say", value: "Prefer Not to Say" }
    ]
    const submitDetails =async () => {
        console.log(user)
        if(!user['name'] || !user['age'] || user['gender']==='Gender'||!user['gender'] || !user['school']){
            setError(error=>"Enter Correct Details");
            return;
        }
        await storeUser(user)   
    }

    const styles = StyleSheet.create({
        imgBack: {
            width: "100%",
            flex: 1,
            resizeMode: "center",
        },
        userForm: {
            flex: 1,
            alignItems: 'center',
            borderWidth: 4,
            borderColor: "#000",
            borderRadius: 10,
            margin: 10,
            paddingVertical: 20
        },
        textInput: {
            backgroundColor: "#000000e0",
            color: "#fff",
            width: "80%",
            borderWidth: 2,
            borderColor: "#000",
            borderRadius: 5,
            paddingVertical: 10,
            paddingHorizontal: 20,
            marginVertical: 20
        },
        formHead: {
            textAlign: 'center',
            fontSize: 25,
            paddingVertical: 20
        },
        button: {
            width: "50%",
            backgroundColor: "yellowgreen",
            paddingVertical: 10,
            borderRadius: 10,
        },
        buttonText: {
            textAlign: 'center',
            fontSize: 20,
            color: "#4e0707",
            fontWeight: "bold"
        },
        error: {
            display: error ? "flex" : "none",
            lineHeight: 15,
            backgroundColor: "#a20000b8",
            paddingVertical: 10,
            paddingHorizontal: 30,
            color: "#fff",
            fontSize: 15,
            width: "70%",
            textAlign: "center",
            marginVertical: 10
        }
    })
    return (
        <ImageBackground style={styles.imgBack} source={require('../images/stud.webp')}>

            <Text style={styles.formHead}> Fill the Information to get Started</Text>
            <View style={styles.userForm} >
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter Name Here (eg.JOHN)"
                    placeholderTextColor="#ddd"
                    onChangeText={name => setuser({ ...user, name })}
                    value={user['name']}
                />

                <TextInput
                    style={styles.textInput}
                    keyboardType='numeric'
                    placeholder="Enter Age Here (eg. 19)"
                    placeholderTextColor="#ddd"
                    onChangeText={age => setuser({ ...user, age })}
                    value={user['age']}
                />

                <Picker
                    style={styles.textInput}
                    mode="dropdown"
                    selectedValue={user.gender}
                    onValueChange={gender => setuser({ ...user, gender })}
                >
                    <Picker.Item
                        key="NONE"
                        label="Gender"
                        value={null}
                    />
                    {genders.map((item, index) => {
                        return <Picker.Item
                            key={item.type}
                            label={item.type}
                            value={item.value}
                            index={index}
                        />
                    })}
                </Picker>
                <TextInput
                    style={styles.textInput}
                    placeholder="School/University"
                    placeholderTextColor="#ddd"
                    onChangeText={school => setuser({ ...user, school })}
                    value={user['school']}
                />
                <Text style={styles.error}>{error}</Text>
                <Pressable
                    style={styles.button}
                    onPress={submitDetails}
                >
                    <Text style={styles.buttonText}>Submit</Text>
                </Pressable>
            </View>
        </ImageBackground>
    )
}

export default CreateUser