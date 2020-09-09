import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  FlatList,
  StatusBar,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {View} from 'native-base';
import AddTodo from './AddTodo';
import TodoItem from './TodoItem';
import Button from './Button';
import HeaderComponent from './Header';

import {getTodos, createTodo, deleteTodos, updateTodos} from '../services';
const styles = StyleSheet.create({
  row: {
    top: 15,
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});

const TodosContainer = () => {
  const [state, setState] = useState({
    todos: [],
    loading: {
      addtodo: false,
      deleteLoading: false,
      getTodo: false,
    },
  });

  const [addingTodo, setAddingTodo] = useState(false);
  //didmount
  useEffect(async () => {
    try {
      const todos = await getTodos();
      if (todos) {
        setState({
          ...state,
          todos: todos.todos,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleAddTodo = async (payload) => {
    try {
      const response = await createTodo(payload);
      setState({
        ...state,
        todos: [...state.todos, response.data.todo],
      });
    } catch (err) {
      console.log('errrr', err.response);
    }
  };
  const deleteTodo = async (id) => {
    try {
      const res = await deleteTodos(id);
      if (res) {
        const filterData = state.todos.filter((item) => item._id !== id);
        setState({
          ...state,
          todos: filterData,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleUpdate = async (id) => {
    try {
      const response = await updateTodos(id);
      if (response) {
        const filterData = state.todos.map((item) => {
          if (item._id === id) {
            item = response.data.todo;
          }
          return item;
        });

        setState({...state, todos: filterData});
      }
    } catch (err) {
      console.log('error', err);
    }
  };
  getAllData = () => {
    return (
      <FlatList
        style={{width: '100%', top: 15}}
        data={state.todos}
        keyExtractor={(item) => item._id}
        renderItem={({item: todo}) => {
          return (
            <TodoItem
              todo={todo}
              onUpdate={handleUpdate}
              onDelete={deleteTodo}
            />
          );
        }}
      />
    );
  };
  const isAndroid = Platform.OS === 'android';
  return (
    <View style={{flex: 1}}>
      <HeaderComponent title="Todo App" />
      {isAndroid ? (
        <StatusBar backgroundColor="#e38f04" barStyle="light-content" />
      ) : null}
      <ScrollView>
        {getAllData(state.todos)}
        {addingTodo ? (
          <View style={styles.row}>
            <AddTodo
              onCancelDelete={() => setAddingTodo(addingTodo)}
              onBlur={() => setAddingTodo(addingTodo)}
              onAdd={handleAddTodo}
            />
          </View>
        ) : null}
      </ScrollView>
      <Button onPress={() => setAddingTodo(!addingTodo)} />
    </View>
  );
};

export default TodosContainer;
