import React, { useReducer, useState } from 'react'
import { View, StyleSheet, Pressable, TextInput } from 'react-native'
import { FlatList } from 'react-native'
import { Text } from 'react-native'

export default function TodoList() {
    const initialState = {
        todos: [],
    }

    const todoReducer = (state, action) => {
        switch (action.type) {
            case 'ADD_TODO':
                return {
                    todos: [...state.todos, action.payload],
                }
            case 'REMOVE_TODO':
                return {
                    todos: state.todos.filter(todo => todo.id !== action.payload.id),
                }
            default:
                throw new Error()
        }
    }

    const [state, dispatch] = useReducer(todoReducer, initialState)
    const [text, setText] = useState('')

    return (
        <>
            <View style={styles.container}>
                <TextInput
                    style={styles.form}
                    value={text}
                    onChangeText={setText}
                    placeholder="Add new..."
                />
                <Pressable
                    onPress={() => {
                        if (!text.trim()) return
                        dispatch({
                            type: 'ADD_TODO',
                            payload: { id: Date.now().toString(), text },
                        })
                        setText('')
                    }}
                >
                    <Text style={styles.pressableText}>Save</Text>
                </Pressable>
            </View>
            <View>
                <FlatList
                    data={state.todos}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Pressable style={[styles.row]} onPress={() => dispatch({
                            type: 'REMOVE_TODO',
                            payload: item,
                        })}>
                            <Text style={styles.rowText}>
                                {item.text}
                            </Text>
                        </Pressable>
                    )}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
        marginTop: 8,
    },
    form: {
        fontSize: 24,
    },
    pressableText: {
        color: '#007AFF',
        fontSize: 24,
    },
    row: {
        flexDirection: 'row',
        marginLeft: 8,
    },
    rowText: {
        fontSize: 24,
        marginBottom: 24,
    },
})