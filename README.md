## Requirements

Node 14 or higher. Make sure you don't have any installation package below to prevent error

- redux
- react-redux
- redux-flipper
- redux-persist
- redux-persist-sensitive-storage
- @reduxjs/toolkit

We already included above package in library dependecies, so it will automaticaly installed with supported version.

## Installation

First you must have dependencies with supported version
"react-native-sensitive-info": "^5.5.8",
"react-native-flipper": "^0.212.0"
or install first

```
yarn add react-native-sensitive-info@^5.5.8 react-native-flipper@^0.212.0
```

Installation command

```
npm install rn-code-id-storage
```

```
yarn add rn-code-id-storage
```

### Ios Installation

This library already support auto linking for native ios, just run command in ios directory

```
pod install
```

## Description

This library already include feature:

1. Redux Storage
2. Redux Persist
3. Redux Flipper Debugger
4. Encryption Sensitive storage

## Usage

You can follow redux folder structure bellow or you can create slice and export the reducer

1. First you create util for define constant for action you will be called

```js
/// src/module/auth/redux/util.js
import {CONST_AUTH_REDUX} from './util';

export const CONST_AUTH_REDUX = {
  SET_AUTH: 'SET_AUTH',
};
```

2. Create action

```js
/// src/module/auth/redux/action.js
import {CONST_AUTH_REDUX} from './util';

export const setAuth = payload => ({
  type: CONST_AUTH_REDUX.SET_AUTH,
  payload,
});
```

3. Create initial state for reducer

```js
/// src/module/auth/redux/store.js
export default {
  token: '',
  email: '',
};
```

4. Create reducer

```js
/// src/module/auth/redux/reducer.js
import {CONST_AUTH_REDUX} from './util';
import store from './store';

const authReducer = (state = store, action) => {
  const {payload, type} = action;
  const actions = {
    [CONST_AUTH_REDUX.SET_AUTH]: () => ({
      ...state,
      token: payload?.token,
      email: payload?.email,
    }),

    DEFAULT: () => state,
  };

  return (actions[type] || actions.DEFAULT)();
};

export default authReducer;
```

5. Create object to collect all reducer in your main store

```js
/// src/store/index.js
import authReducer from '@code-module-auth/redux/reducer';

export default {
  auth: authReducer,
};
```

6. Create provider and import store from your main store
   Provider have supported props below:

- persistKey (string) : Key that you used for encrypt sensitive storage in redux persist
- store (Object): Collect of all reducer
- whitelist (Array): All of key of Object store you defined in whitelist will be pesist by redux persist
- middleware: You can define middleware to include in store, example when youre using redux saga or RTK

```js
//App.js
import React from 'react';
import Navigator from '@code-navigation/Navigator';
import store from '@code-store/index';
import {Provider} from 'rn-codeid-storage';

function App() {
  return (
    <Provider
      persistKey="729f9c4d-6ffc-4693-842f-b901f8df049a"
      whitelist={['auth']}
      store={store}>
      <Navigator />
    </Provider>
  );
}

export default App;
```

7. Dispatch and useSelector
   You can use dispatch and useSelector with rn-codeid-storage or directly using react-redux

```js
import {setAuth} from '@code-module-auth/redux/action';
import {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'rn-codeid-storage';

function useAuthLogin() {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth?.token);
}

export default useAuthLogin;
```

## Props

### Provider

- persistKey (string) : Key that you used for encrypt sensitive storage in redux persist
- store (Object): Collect of all reducer
- whitelist (Array of String): All of key of Object store you defined in whitelist will be pesist by redux persist
- middleware (Any): You can define middleware to include in store, example when youre using redux saga or RTK
