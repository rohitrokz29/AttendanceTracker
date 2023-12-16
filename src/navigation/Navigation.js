import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../components/Home";
import CreateUser from "../components/CreateUser";
import UserProfile from "../components/UserProfile";
import { useUserContext } from "../context/UserData";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import SubjectList from "../components/SubjectList";
import Subject from "../components/Subject";
import Loading from "./Loading";
const GetStartedStack = createNativeStackNavigator();

const GetStartedScreens = () => {
    return (
        <GetStartedStack.Navigator screenOptions={{ headerShown: false }}>
            <GetStartedStack.Screen name='home' component={Home} />
            <GetStartedStack.Screen name='createUser' component={CreateUser} />
        </GetStartedStack.Navigator>
    )
}

const SubjectListStack = createNativeStackNavigator();
const SubjectListScreens = () => {
    return (
        <SubjectListStack.Navigator screenOptions={{ headerShown: false }}>
            <SubjectListStack.Screen name="SubjectList" component={SubjectList} />
            <SubjectListStack.Screen name='Subject' component={Subject} />
        </SubjectListStack.Navigator>
    )
}


const Tab = createBottomTabNavigator();
const AppScreens = () => {
    return (
        <Tab.Navigator
            initialRouteName="subjectList"
            tabBarOptions={{
                activeTintColor: '#ff8070',
                inactiveTintColor: "#fff",
                labelStyle: {
                    fontSize: 15,
                },
                tabStyle: {
                    backgroundColor: "#414141"
                }
            }}
            screenOptions={{
                headerShown: false
            }}
        >
            <Tab.Screen
                name='subjectList'
                component={SubjectListScreens}
                options={{
                    tabBarLabel: "Subjects",
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="list" size={size} color={color} />)
                }}
            />
            <Tab.Screen
                name='Profile'
                component={UserProfile}
                options={{
                    tabBarLabel: "Profile",
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="user" size={size} color={color} />
                    ),

                }}
            />

        </Tab.Navigator>
    )
}

export default Navigation = () => {

    const { user, isLoading } = useUserContext();

    return isLoading
        ? (<Loading />)
        : (
            < NavigationContainer >
                {
                    user ? <AppScreens /> :
                        < GetStartedScreens />
                }
            </NavigationContainer >
        )
}