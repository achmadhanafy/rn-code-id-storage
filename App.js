import React from 'react';
import Navigator from '@code-navigation/Navigator';
import store from '@code-store/index';
import {Provider} from 'rn-codeid-storage';
import {apiMiddleware, apiReducers} from '@code-api/index';

function App() {
  return (
    <Provider
      otherMiddleware={apiMiddleware}
      persistKey="729f9c4d-6ffc-4693-842f-b901f8df049a"
      whitelist={['auth']}
      store={{
        ...store,
        ...apiReducers,
      }}>
      <Navigator />
    </Provider>
  );
}

export default App;
