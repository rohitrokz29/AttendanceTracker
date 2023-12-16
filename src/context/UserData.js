import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
export const UserContext = createContext();

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'Decenber'];

export const UserState = ({ children }) => {
    const [user, setuser] = useState(null);
    const [subjectList, setsubjectList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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
                    console.log(subjectList);
                }
            } catch (error) {
                setuser(null);
                setsubjectList([]);
            }
            setIsLoading(isLoading => !isLoading)
        }
        checkUser();

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

            let sub = {
                subject,
                minRequired,
                startDate,
                currentLastDate: startDate,
                '0': {}
            }
            /**
             * 0->startDate month
             * 1->strtDate MOnth+1
             * 0:{
             *  'date1':0/1/-1,
             * 'date2':0/1/-1
             * ........
             * ......
             * .......
             * }
             * 0=>absent,1=>present,-1=>no class
             */
            await AsyncStorage.setItem(subject, JSON.stringify(sub));
            return true;
        } catch (error) {
            return null;
        }
    }
    const clearSubjects = async () => {
        try {
            subjectList.forEach(async (subject) => {
                await AsyncStorage.removeItem(subject['subject']);
            })
            setsubjectList([]);
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
                isLoading,
                storeUser,
                addSubject,
                clearData,
                clearSubjects
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