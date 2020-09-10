import React, {useState, useEffect} from 'react';
import {ScrollView, FlatList, View} from 'react-native';
import AddTodo from '../components/AddTodo';
import TodoItem from '../components/TodoItem';
import Button from '../components/Button';
import HeaderComponent from '../components/Header';
import {getTodos, createTodo, deleteTodos, updateTodos} from '../services';

const TodoScreen = () => {
  const [state, setState] = useState({
    todos: [],
    loading: {
      addtodo: false,
      deleteLoading: false,
      getTodo: false,
    },
    isVisible: false,
  });

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
        isVisible: false,
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

  return (
    <View style={{flex: 1}}>
      <HeaderComponent title="Todo App" />
      <ScrollView>
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

        {state.isVisible ? (
          <View style={{flex: 1}}>
            <AddTodo onAdd={handleAddTodo} visible={state.isVisible} />
          </View>
        ) : null}
      </ScrollView>
      <Button onPress={(value) => setState({...state, isVisible: !value})} />
    </View>
  );
};

export default TodoScreen;
