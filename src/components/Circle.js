import React from 'react';
import {View} from 'react-native';

export default Circle = ({ color }) => {
  return (
    <View style={{
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: color,
      marginRight: 10
    }} />
  )
}
