import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TodoList from './components/todo-app';

export default function App() {
  return (
    <View style={styles.container}>
      <TodoList list={[]}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});