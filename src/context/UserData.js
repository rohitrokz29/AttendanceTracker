import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
export const UserContext = createContext();

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'Decenber'];
const days = ['Sunday', 'Monday', 'Tuesday', 'Thursday', 'Friday', 'Saturday']
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

    const addSubject = async ({ subject, startDate, minRequired }) => {
        console.log({ subject, startDate, minRequired })
        /**
         * add sub to async storage
         * add subject to subjectList array in both async storage and state
         */
        try {
            let newSubject = {
                subject,
                currentPresent: 0,
                currentAbsent: 0,
                minRequired
            };
            subjectList.unshift(newSubject)
            await AsyncStorage.setItem('subjectList', JSON.stringify(subjectList));

            let currMonth = months[startDate.getMonth()];
            await AsyncStorage.setItem(subject, JSON.stringify({
                subject, minRequired, startDate,
                currMonth: []
            }));
            return true;
        } catch (error) {
            return null;
        }
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