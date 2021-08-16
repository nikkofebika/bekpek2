import React from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicon from 'react-native-ionicons';

const Icon = ({ onPress, name, size = 25, style, color = "#fff" }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Ionicon ios={`ios-${name}`} style={[style, { color }]} android={name} size={size} />
    </TouchableOpacity>
  );
};

export default Icon;
