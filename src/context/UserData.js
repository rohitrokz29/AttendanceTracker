import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
export const UserContext = createContext();

export const UserState = ({ children }) => {
    const [user, setuser] = useState(null);
    const [subjectList, setsubjectList] = useState(null);
    useEffect(() => {
        const checkUser = async () => {
            try {
                let result = await AsyncStorage.getItem('user');
                if (result) {
                    result = await JSON.parse(result);
                    setuser(result);
                    let subjects = await AsyncStorage.getItem('subjectList');
                    setsubjectList(subjects);
                    console.log(result)
                }
            } catch (error) {
                setuser(null);
                setsubjectList(null);
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
            console.log(user)
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