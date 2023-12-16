import React from 'react';
import Navigation from './src/navigation/Navigation';
import { UserState } from './src/context/UserData';

export default function App() {
  
  return (
    <UserState>
      <Navigation />
    </UserState>
  );
}
