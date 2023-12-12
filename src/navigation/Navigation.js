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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const GetStartedScreens = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='home' component={Home} />
            <Stack.Screen name='createUser' component={CreateUser} />
        </Stack.Navigator>
    )
}

const AppScreens = () => {
    return (
        <Tab.Navigator
            initialRouteName="Subjects"
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
                headerShown:false
            }}
>
            <Tab.Screen
                name='Subjects'
                component={SubjectList}
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
    const { user } = useUserContext();
    return (
        <NavigationContainer>
            {
                user ? <AppScreens /> : <GetStartedScreens />
            }
        </NavigationContainer>
    )
}