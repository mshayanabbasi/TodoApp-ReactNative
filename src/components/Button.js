import React from 'react';
import {Fab, View} from 'native-base';
import {Icon} from 'react-native-elements';

const Button = ({onPress}) => {
  return (
    <View style={{flex: 1}}>
      <Fab
        direction="up"
        containerStyle={{}}
        style={{backgroundColor: '#e38f04'}}
        position="bottomRight"
        onPress={onPress}>
        <Icon name="add" color="#fff" />
      </Fab>
    </View>
  );
};

export default Button;
