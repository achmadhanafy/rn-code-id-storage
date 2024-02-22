## Requirements

Node 14 or higher. Make sure you don't have any installation package below to prevent error

- redux
- axios
- react-redux
- redux-flipper
- redux-persist
- redux-persist-sensitive-storage
- @reduxjs/toolkit
- react-native-sensitive-info
- react-native-flipper

We already included above package in library dependecies, so it will automaticaly installed with supported version.

## Installation

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
5. Axios and RTK builder

## Usage

### Storage

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
- otherMiddleware: You can define middleware to include in store, example when youre using redux saga or RTK

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

### Api/Network

This library already include Api and RTK builder. So will be easy to create middleware and reducer for api. For setup and use guide, you can follow this step:

1. Create axios instance

```js
/// src/api/axios.js
import axios from 'axios';

const api = () => {
  const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
  });

  // Interceptor Here
  return instance;
};

export default api();
```

You can custom or add another config or add some interceptor as needed.

2. Create api in module

```js
import api from '@code-api/axios';
import {createApi} from '@reduxjs/toolkit/query/react';
import {createBaseQuery} from 'rn-codeid-storage';

const endpoint = '/todos/1';

// define api
export const todosApi = createApi({
  reducerPath: 'todosService',
  baseQuery: createBaseQuery(api),
  tagTypes: ['Todos'],
  endpoints: builder => ({
    getTodos: builder.query({
      query: payload => ({
        url: endpoint,
        method: 'GET',
        params: payload,
      }),
    }),
  }),
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
});

export default todosApi;

// export hooks
export const {useGetTodosQuery} = todosApi;
```

If you can not familiar with RTK Query, you can read in this RTK documentation to define createApi,
documentation: https://redux-toolkit.js.org/rtk-query/overview.
and dont forget to export your hooks

3. Create apiReducers and apiMiddleware

```js
/// src/api/index.js
import todosApi from '@code-module-auth/api/todo';
import {createApiMiddlewares, createApiReducers} from 'rn-codeid-storage';

// import and collect all api from each module
const allApi = [todosApi];

// export apiReducers and apiMiddleware
export const apiReducers = createApiReducers(allApi);
export const apiMiddleware = createApiMiddlewares(allApi);
```

4. import apiMiddleware and apiReducers to Provider

```js
// App.js
import React from 'react';
import Navigator from '@code-navigation/Navigator';
import store from '@code-store/index';
import {Provider} from 'rn-codeid-storage';
import {apiMiddleware, apiReducers} from '@code-api/index';

function App() {
  return (
    <Provider
      //apiMiddleware here
      otherMiddleware={apiMiddleware}
      persistKey="729f9c4d-6ffc-4693-842f-b901f8df049a"
      whitelist={['auth']}
      // desctruct store and apiReducers
      store={{
        ...store,
        ...apiReducers,
      }}>
      <Navigator />
    </Provider>
  );
}

export default App;
```

If you successfully setup,then try to test your code check with flipper network to check api, and see with redux debugger to check apiReducers already connected to your store

## Props

### Provider

- persistKey (string) : Key that you used for encrypt sensitive storage in redux persist
- store (Object): Collect of all reducer
- whitelist (Array of String): All of key of Object store you defined in whitelist will be pesist by redux persist
- otherMiddleware (Any): You can define middleware to include in store, example when youre using redux saga or RTK
