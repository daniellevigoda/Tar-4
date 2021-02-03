import React from 'react';
import { StyleSheet, View, Button, Text, Icon } from 'react-native';
import CCCategories from './ClassComponents/CCCategories';
import CCNotes from './ClassComponents/CCNotes';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CCAddNewNote from './ClassComponents/CCAddNewNote';

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Categories">
        <Stack.Screen name="Categories" component={CCCategories} />
        <Stack.Screen name="Notes" component={CCNotes} />
        <Stack.Screen name="Add New Note" component={CCAddNewNote} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 30,
  },
});
