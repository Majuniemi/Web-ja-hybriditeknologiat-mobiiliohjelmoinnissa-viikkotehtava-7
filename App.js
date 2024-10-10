import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import React from 'react'
import TodoList from './components/TodoList'
import Constants from 'expo-constants'


export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TodoList />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight + 16,
    backgroundColor: '#fff',
    margin: 16,
  }
})