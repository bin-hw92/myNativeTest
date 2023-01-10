import React, { useEffect, useState } from 'react';
import {KeyboardAvoidingView, StyleSheet} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AddTodo from '../components/AddTodo';
import DateHead from '../components/DateHead';
import Empty from '../components/Empty';
import TodoList from '../components/TodoList';
import todosStorage from '../lib/todosStorage';

const TodoContainer = () => {
  const today = new Date();

  const [todos, setTodos] = useState([]);

  const onInsert = (text) => {
    const nextId = todos.length > 0? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
    const todo = {
      id: nextId,
      text,
      done: false,
    };

    setTodos(todos.concat(todo));
  };

  const onToggle = (id) => {
    const nextTodos = todos.map(todo => todo.id === id? {...todo, done: !todo.done} : todo);
    setTodos(nextTodos);
  };

  const onRemove = (id) => {
    const nextTodos = todos.filter(todo => todo.id !== id);
    setTodos(nextTodos);
  };

  useEffect(() => {
    todosStorage.get('todos')
                .then(setTodos)
                .catch(console.error);
  },[]);

  useEffect(() => {
    todosStorage.set('todos', todos).catch(console.error);
  },[todos]);

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['bottom']} style={styles.block}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios'? 'padding' : undefined}
          style={styles.avoid}
        >
          <DateHead date={today}/>
          {todos.length === 0 ? (
            <Empty />
          ):(
            <TodoList todos={todos} onToggle={onToggle} onRemove={onRemove} />
          )}
          <AddTodo onInsert={onInsert}/>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: 'white',
  },
  avoid: {
    flex: 1,
  },
});

export default TodoContainer;