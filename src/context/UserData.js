import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
export const UserContext = createContext();

export const UserState = ({ children }) => {
    const [user, setuser] = useState(null);
    const [subjectList, setsubjectList] = useState([]);
    useEffect(() => {
        const checkUser = async () => {
            try {
                let result = await AsyncStorage.getItem('user');
                if (result) {
                    result = await JSON.parse(result);
                    setuser(result);
                    let subjects = await AsyncStorage.getItem('subjectList');
                    subjects = await JSON.parse(subjects);
                    subjectList.push(...subjects);
                    console.log(subjectList)

                }
            } catch (error) {
                setuser(null);
                setsubjectList([]);
            }
        }
        checkUser()
    }, [])

    const storeUser = async (user) => {
        try {
            await AsyncStorage.setItem('user', JSON.stringify(user));
            await AsyncStorage.setItem("subjectList", JSON.stringify([]))
            setuser(user);
            setsubjectList([]);
        } catch (error) {
            console.error(error);
        }
    }
    const clearData = async () => {
        try {
            await AsyncStorage.clear();
        } catch (error) {
            console.error(error);
        }
    }

    const addSubject = () => {

    }
    return (
        <UserContext.Provider
            value={{
                user,
                subjectList,
                storeUser,
                addSubject,
                clearData
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    let context = useContext(UserContext);
    if (!context) return null;

    return context;
}