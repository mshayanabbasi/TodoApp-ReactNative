import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {View, CheckBox, Body, Icon} from 'native-base';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
  },

  row: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});

const TodoItem = ({todo, onUpdate, onDelete}) => {
  return (
    <View style={styles.row}>
      <View
        style={{
          flex: 1,
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 5,
          paddingRight: 10,
        }}>
        <TouchableOpacity
          onPress={() => onUpdate(todo._id)}
          style={{
            flex: 1,
            width: '100%',
            flexDirection: 'row',
          }}>
          <CheckBox
            checked={todo.completed}
            onPress={() => onUpdate(todo._id)}
          />
          <Body
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              paddingLeft: 25,
            }}>
            <Text
              style={{
                color: todo.completed ? 'grey' : 'black',
                textDecorationLine: todo.completed ? 'line-through' : 'none',
              }}>
              {todo.title}
            </Text>
          </Body>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onDelete(todo._id)}
          style={{paddingLeft: 25, paddingRight: 15}}>
          <Icon
            name="trash-outline"
            color={`${todo.title.length > 0 ? 'black' : 'grey'}`}
            size={23}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TodoItem;
