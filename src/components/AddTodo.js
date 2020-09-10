import React, {useState} from 'react';
import {Modal, View} from 'react-native';
import {Input, Button, Text} from 'react-native-elements';

const AddTodo = ({onAdd, visible}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  onSubmit = () => {
    const obj = {
      title,
      description,
      completed,
    };
    onAdd(obj);
  };
  return (
    <Modal visible={visible} animationType="slide">
      <View
        style={{
          flex: 1,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          paddingRight: 10,
          paddingBottom: 5,
        }}>
        <Text style={{textDecorationColor: '#e38f04'}} h2>
          Add Todo
        </Text>
        <Input
          style={{width: '90%'}}
          placeholder="title"
          onChangeText={(value) => setTitle(value)}
          value={title}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <Input
          style={{width: '90%'}}
          placeholder="description"
          onChangeText={(value) => setDescription(value)}
          value={description}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <Button
          onPress={onSubmit}
          title="Add"
          buttonStyle={{backgroundColor: '#e38f04'}}
        />
      </View>
    </Modal>
  );
};

export default AddTodo;
