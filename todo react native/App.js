import React from 'react';
import { StyleSheet, Dimensions, Text, View } from 'react-native';
import {Header} from "native-base";
import TodoList from './components/todo-app';

export default function App() {
  return (
      <View style={styles.container2}>
        <Header style={{backgroundColor:'black', paddingTop:15, width:Dimensions.get('window').width}}><Text style={{ fontSize: 25,color:'white'}}>TODO LIST</Text></Header>
        <TodoList list={[]}/>
      </View>

  );
}
const styles = StyleSheet.create({
  container2: {
    flex: 1,
    borderRadius: 2,
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 1,
  }, 
});
