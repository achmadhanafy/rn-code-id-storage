import React from 'react';
import {Button, Text, TextInput, View, useWindowDimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import useAuthLogin from './useAuthLogin';
import {Input} from '@code-components/generic';
import {useGetTodosQuery} from '@code-module-auth/api/todo';

function AuthLogin() {
  const {height} = useWindowDimensions();
  const {
    form: {email, password},
    onFormChange,
    onSubmit,
  } = useAuthLogin();

  const {data} = useGetTodosQuery();

  console.log(data);

  return (
    <SafeAreaView>
      <View
        style={{
          paddingHorizontal: 16,
          minHeight: height - 50,
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
        <Input
          label="Email"
          value={email}
          onChangeText={val => onFormChange('email', val)}
        />
        <Input
          style={{marginTop: 10}}
          label="Password"
          isHideInput={true}
          value={password}
          onChangeText={val => onFormChange('password', val)}
        />
        <Button title="Masuk" onPress={() => onSubmit(email)} />
      </View>
    </SafeAreaView>
  );
}

export default AuthLogin;
