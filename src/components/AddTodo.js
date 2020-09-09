import React, {useState} from 'react';
import {TextInput, TouchableOpacity} from 'react-native';
import {View, Body, CheckBox, Icon} from 'native-base';

const AddTodo = ({onBlur, onAdd, onCancelDelete}) => {
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);

  onSubmit = () => {
    if (title.length > 0) {
      const obj = {
        title,
        completed,
      };
      onAdd(obj);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 10,
        paddingBottom: 5,
      }}>
      <CheckBox checked={completed} onPress={() => setCompleted(!completed)} />
      <Body
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          paddingLeft: 25,
        }}>
        <TextInput
          style={{width: '90%'}}
          placeholder="title"
          autoFocus
          underlineColorAndroid="transparent"
          underLineColor="transparent"
          blurOnSubmit
          onSubmitEditing={onSubmit}
          onChangeText={(value) => setTitle(value)}
          value={title}
          autoCorrect={false}
          autoCapitalize="none"
          onBlur={onBlur}
        />
      </Body>
      <TouchableOpacity
        onPress={onCancelDelete}
        style={{paddingLeft: 25, paddingRight: 15}}>
        <Icon
          name="trash-outline"
          color={`${title.length > 0 ? 'black' : 'grey'}`}
          size={23}
        />
      </TouchableOpacity>
    </View>
  );
};

export default AddTodo;
