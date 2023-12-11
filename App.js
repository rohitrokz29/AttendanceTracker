import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//components
import CreateUser from './src/components/CreateUser';
import Home from './src/components/Home';
import Navigation from './src/navigation/Navigation';
import { UserState } from './src/context/UserData';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <UserState>
      <Navigation />
    </UserState>
  );
}
const styles = StyleSheet.create(({
  container: {
    alignItems: 'center',
    width: "100%"
  }
}))


