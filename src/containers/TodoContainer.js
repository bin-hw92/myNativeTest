import { addDays } from 'date-fns';
import React, { useEffect, useState } from 'react';
import {Button, KeyboardAvoidingView, StyleSheet} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AddTodo from '../components/AddTodo';
import DateHead from '../components/DateHead';
import Empty from '../components/Empty';
import TodoList from '../components/TodoList';
import todosStorage from '../lib/todosStorage';

const TodoContainer = ({route, navigation}) => {
  const [today, setToday] = useState(new Date());

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

  const onDate = (num) => {
    if(num === 1){
      setToday(addDays(today, 1));
    }
    if(num === -1){
      setToday(addDays(today, -1));
    }
  }

  useEffect(() => {
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    todosStorage.get(`${year}.${month}.${day}-todos`)
                .then(setTodos)
                .catch(() => setTodos([]));
  },[]);

  useEffect(() => {
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    todosStorage.set(`${year}.${month}.${day}-todos`, todos).catch(console.error);
  },[todos]);

  useEffect(() => {
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    todosStorage.get(`${year}.${month}.${day}-todos`)
                .then(setTodos)
                .catch(() => setTodos([]));
  },[today]);

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['bottom']} style={styles.block}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios'? 'padding' : undefined}
          style={styles.avoid}
        >
          <DateHead date={today} onDate={onDate} />
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
