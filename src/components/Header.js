import React from 'react';
import {Header} from 'react-native-elements';

const HeaderComponent = ({title}) => {
  return (
    <Header
      placement="left"
      backgroundColor="#e38f04"
      centerComponent={{
        text: title,
        style: {color: '#fff', fontSize: 20, fontWeight: 'bold'},
      }}
    />
  );
};

export default HeaderComponent;
