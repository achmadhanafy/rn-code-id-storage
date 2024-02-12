import React from 'react';
import {Text, TextInput, View} from 'react-native';
import PropTypes, {any} from 'prop-types';
import Style from './style';

function Input(props) {
  const {value, onChangeText, style, isHideInput, label} = props;
  return (
    <View style={style}>
      <Text>{label}</Text>
      <TextInput
        secureTextEntry={isHideInput}
        onChangeText={onChangeText}
        editable
        value={value}
        style={Style.input}
      />
    </View>
  );
}

Input.defaultProps = {
  style: {},
  isHideInput: false,
};

Input.propTypes = {
  value: PropTypes.any.isRequired,
  onChangeText: PropTypes.func.isRequired,
  style: PropTypes.objectOf(any),
  isHideInput: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

export default Input;
