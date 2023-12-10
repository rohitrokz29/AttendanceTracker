import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,SafeAreaView } from 'react-native';
import CreateUser from './src/components/CreateUser';
export default function App() {
  return (
    <SafeAreaView>
      <CreateUser/>
    </SafeAreaView>
  );
}


