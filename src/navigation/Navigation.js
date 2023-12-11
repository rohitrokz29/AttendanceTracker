import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../components/Home";
import CreateUser from "../components/CreateUser";
import UserProfile from "../components/UserProfile";
import Subject from "../components/Subject";
import { useUserContext } from "../context/UserData";

const Stack = createNativeStackNavigator();

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
        <Stack.Navigator>
            <Stack.Screen name='userProfile' component={UserProfile} />
            <Stack.Screen name='subject' component={Subject} />
        </Stack.Navigator>
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